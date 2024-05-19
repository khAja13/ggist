// Import necessary modules
import { NextApiRequest, NextApiResponse } from "next";
import { register, collectDefaultMetrics } from "prom-client";

// Collect default Prometheus metrics
collectDefaultMetrics({});

// Define the function to handle GET requests
export default (_: NextApiRequest, res: NextApiResponse) => {
  // Set response headers
  res.setHeader("Content-type", register.contentType);
  res.setHeader("Cache-Control", "no-store");

  // Send Prometheus metrics as the response body
  res.send(register.metrics());
};
