import express from "express";
import cors from "cors";
import tensorRoutes from "../routes/tensor.routes";

export class ServerApp {
  constructor(
    private port = process.env.PORT || 3000, 
    private app = express()
){
    // Configure middleware
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    

    

    // Configure routes
    this.app.use('/api/tensorflow', tensorRoutes)
  }

   run() {
        this.app.listen(this.port, () => {
        console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}
