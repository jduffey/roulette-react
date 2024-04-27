#!/bin/bash

# Start the blockchain in the background
echo "Starting the blockchain..."
npm run start-chain &
CHAIN_PID=$!

# Wait for the blockchain to be ready
echo "Waiting for blockchain to be ready..."
while ! nc -z localhost 8545; do   
  sleep 1 # wait for 1 second before check again
done

# Initialize the blockchain
echo "Initializing the blockchain..."
npm run init-chain

# Start the React frontend
echo "Starting the React frontend..."
npm start

