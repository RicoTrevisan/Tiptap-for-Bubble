function(instance, context) {
    try {
        // add display: flex to main element
        instance.canvas.css("display", "flex");

        // this boolean turns true after the setup has been done, but the editor might not yet be initialized.
        // if the setup runs twice, it can add double initial data, etc.
        instance.data.isEditorSetup = false;

        // this boolean turns true when the editor is initialized and ready.
        instance.data.editor_is_ready = false;

        instance.publishState("is_ready", false);

        //    instance.canvas.css({'overflow':'scroll'});

        instance.data.stylesheet = document.createElement("style");
        instance.canvas.append(instance.data.stylesheet);

        // sfunction to find the nearest parent.
        // useful when Tiptap is used inside a repeating group
        function findElement(elementID) {
            let $parent = instance.canvas.parent();
            while ($parent.length > 0) {
                var $foundMenu = $parent.find("#" + elementID);

                if ($foundMenu.length > 0) {
                    return $foundMenu[0];
                }

                $parent = $parent.parent();
            }
        }
        instance.data.findElement = findElement;

        instance.data.debounce = function (func, delay = 1000) {
            let timer;
            return function () {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    func.apply(this, arguments);
                }, delay);
            };
        };

        // throttle function: to take it easy on the autobinding.
        // 1. writes to autobinding
        // 2. then waits a certain delay
        // 3. then writes again if the user created more changes
        // source: from https://blog.webdevsimplified.com/2022-03/debounce-vs-throttle/code

        
        function throttle(callback, delay = 1000) {
            instance.data.shouldWait = false;
            instance.data.timeoutFunc = () => {
                if (instance.data.waitingArgs == null) {
                    instance.data.shouldWait = false;
                } else {
                    callback(...instance.data.waitingArgs);
                    instance.data.waitingArgs = null;
                    setTimeout(instance.data.timeoutFunc, delay);
                }
            };

            return (...args) => {
                if (instance.data.shouldWait) {
                    instance.data.waitingArgs = args;
                    return;
                }

                // tests

                callback(...args);
                instance.data.shouldWait = true;

                setTimeout(instance.data.timeoutFunc, delay);
            };
        };
        instance.data.throttle = throttle;

        function returnAndReportErrorIfEditorNotReady(errorFragment = "error") {
            const message =
                "Tried to run " +
                errorFragment +
                " before editor was ready. Crash prevented. Returning";
            console.log(message);
            context.reportDebugger(message);
            return;
        }
        instance.data.returnAndReportErrorIfEditorNotReady =
            returnAndReportErrorIfEditorNotReady;

        function maybeSetupCollaboration(
            instance,
            properties,
            options,
            extensions,
        ) {
                if (properties.collab_active === false) return
            // removes initialContent -- normally a collab document will have some document in the cloud.
            delete options.content;

            if (!properties.collab_active) {
                console.log("collab is not active");
                return;
            }
            if (properties.collabProvider === "liveblocks") {
                setupLiveblocks(extensions, properties);
                return;
            }

            if (properties.collabProvider === "tiptap") {
                setupTiptapCloud(extensions, properties);
                return;
            }

            if (properties.collabProvider === "custom") {
                setupCustomHocuspocus(extensions, properties);
                return;
            }
        }
        instance.data.maybeSetupCollaboration = maybeSetupCollaboration;

        function setupCustomHocuspocus(extensions, properties) {
            console.log("setting up custom collab");
            const HocusPocusProvider = window.tiptapHocuspocusProvider;
            const Collaboration = window.tiptapCollaboration;
            const CollaborationCursor = window.tiptapCollaborationCursor;
            const Y = window.tiptapY;
            if (!properties.collab_url.endsWith("/")) {
                properties.collab_url += "/";
            }

            const custom_url = properties.collab_url + properties.collab_app_id;
            // console.log("custom_url", custom_url);
            try {
                instance.data.provider = new HocusPocusProvider({
                    url: custom_url,
                    name: properties.collab_doc_id,
                    token: properties.collab_jwt,
                    // document: new Y.Doc(),
                    onStatus: (event) => {
                        console.log("onStatus event: " + JSON.stringify(event));
                    },
                    onOpen: () => {
                        console.log("onOpen");
                    },
                    onConnect() {
                      console.log("onConnect");
                    },
                    onAuthenticated() {
                        console.log("onAuthenticated");
                    },
                    onAuthenticationFailed: ({ reason }) => {
                      console.log("onAuthenticationFailed", reason);
                    },
                    // onStatus: ({ status }) => {
                    //     // …
                    // },
                    // onMessage: ({ event, message }) => {
                    //     console.log("onMessage, event, message", JSON.stringify(event), JSON.stringify(message));
                    // },
                    // onOutgoingMessage: ({ message }) => {
                    // console.log("onOutgoingMessage, message", JSON.stringify(message))
                    // },
                    onSynced: ({ state }) => {
                      console.log("onSynced, state", JSON.stringify(state));
                    },
                    onClose: ({ event }) => {
                        console.log("onClose, event", JSON.stringify(event));
                    },
                    onDisconnect: ({ event }) => {
                        console.log(
                            "onDisconnect, event",
                            JSON.stringify(event),
                        ); 
                    },
                    onDestroy() {
                        console.log("onDestroy");
                    },
                    onAwarenessUpdate: ({ added, updated, removed }) => {
                        // …
                    },
                    onAwarenessChange: ({ states }) => {
                        // …
                    },
                    onStateless: ({ payload }) => {
                      console.log("onStateless, payload", payload);
                        // the provider can also send a custom message to the server: provider.sendStateless('any string payload')
                    },
                });


                extensions.push(
                    Collaboration.configure({
                        document: instance.data.provider.document,
                    }),
                    CollaborationCursor.configure({
                        provider: instance.data.provider,
                    }),
                );
            } catch (error) {
                const message = "Error setting up custom collab";
                context.reportDebugger(message + error);
                console.log(message + error);
            }
            return;
        }

        function setupTiptapCloud(extensions, properties) {
            console.log("setting up TiptapCloud");
            const TiptapCollabProvider = window.tiptapCollabProvider;
            const Collaboration = window.tiptapCollaboration;
            const CollaborationCursor = window.tiptapCollaborationCursor;

            try {
                instance.data.provider = new TiptapCollabProvider({
                    appId: properties.collab_app_id,
                    name: properties.collab_doc_id,
                    token: properties.collab_jwt,
                });
            } catch (error) {
                const message = "Error setting up custom collab";
                context.reportDebugger(message + error);
                console.log(message + error);
            }

            extensions.push(
                Collaboration.configure({
                    document: instance.data.provider.document,
                }),
                CollaborationCursor.configure({
                    provider: instance.data.provider,
                }),
            );

            return;
        }
        // instance.data.setupTiptapCloud = setupTiptapCloud;

        function setupLiveblocks(extensions, properties) {
            console.log("setting up collab with Liveblocks");
            if (!properties.liveblocksPublicApiKey) {
                context.reportDebugger(
                    "Liveblocks is selected but there's no plublic API key",
                );
                return;
            }
            const createClient = window.tiptapCreateClient;
            const LiveblocksProvider = window.tiptapLiveblocksProvider;
            const Collaboration = window.tiptapCollaboration;
            const CollaborationCursor = window.tiptapCollaborationCursor;
            const Y = window.tiptapY;

            try {
                const client = createClient({
                    publicApiKey: properties.liveblocksPublicApiKey,
                });

                const { room, leave } = client.enterRoom(
                    properties.collab_doc_id,
                    {
                        initialPresence: {},
                    },
                );

                const yDoc = new Y.Doc();
                const Text = yDoc.getText("tiptap");
                const Provider = new LiveblocksProvider(room, yDoc);

                extensions.push(
                    Collaboration.configure({
                        document: yDoc,
                    }),
                    CollaborationCursor.configure({
                        provider: Provider,
                    }),
                );
            } catch (error) {
                context.reportDebugger(
                    "There was an error setting up Liveblocks. " + error,
                );
            }

            return extensions;
        }
        instance.data.setupLiveblocks = setupLiveblocks;
    } catch (error) {
        console.log("error in initialize", error);
    }
}