import { ServerApp } from "./presentation/server-app";

( async() => {

     main();

})();


 function main() {
    const server = new ServerApp();
     server.run();
}

