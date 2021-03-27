import "@feathersjs/transport-commons";
import { Hook, HookContext } from "@feathersjs/feathers";
import { Application } from "./declarations";

export default function (app: Application): void {
    if (typeof app.channel !== "function") {
        // If no real-time functionality has been configured just return
        return;
    }

    app.on("connection", (connection: any): void => {
        app.channel("anonymous").join(connection);
    });

    app.on("disconnect", connection => {
        
    })

    app.on("login", (authResult: any, { connection }: any): void => {
        // connection can be undefined if there is no
        // real-time connection, e.g. when logging in via REST
        if (connection) {
            // Obtain the logged in user from the connection
            const { user } = connection;

            app.channel("anonymous").leave(connection);
            app.channel("authenticated").join(connection);

            if (user.isAdmin) {
                app.channel("admins").join(connection);
            }

            app.channel(`userIds/${user.user_id}`).join(connection);
        }
    });

    // app.publish((data: any, hook: HookContext) => {
    //     return app.channel("admins");
    // });

    app.service("chat").publish((chat: any) => {
        const from = chat.chat_to;
        const to = chat.chat_from;

        console.log('New chat created', chat);
        

        return [app.channel(`userIds/${from}`), app.channel(`userIds/${to}`)];
    });
}
