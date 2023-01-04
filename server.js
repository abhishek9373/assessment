const express = require('express');
const mongoose = require('mongoose');
const async = require('async');

const app = express();

// Replace the following with your MongoDB connection string
const url =
  "mongodb+srv://Abhishek:abhi0023@cluster0.nxevonu.mongodb.net/assignment";
const dbName = 'assignment';

// Connect to the MongoDB database
mongoose.connect(url, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Connected to MongoDB');
  }
});

// Define the schema and model for the tree
const treeSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true
  },
  left: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tree'
  },
  right: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tree'
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tree',
    required: true
  }
});

const Tree = mongoose.model('second', treeSchema);

// Create a BFS function to search the tree
function bfs(root, callback) {
  const queue = async.queue((node, cb) => {
    // process the node here
    callback(node.value);

    // add the children of the node to the queue
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
    cb();
  }, 1);

  // add the root node to the queue to start the search
  queue.push(root);
}

// Create an API route to search the tree
app.get('/search', (req, res) => {
  // Find the root node of the tree
  Tree.findOne({ parent: null }, (err, root) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    if (!root) {
      res.send('Tree is empty');
      return;
    }

    // Perform the BFS search and return the values
    const values = [];
    bfs(root, (value) => {
      values.push(value);
    });
    res.send(values);
  });
});

// Create an API route to insert the root node
app.post("/insert-root", (req, res) => {
  // Generate the root node and save it to the database
  const value = Math.floor(Math.random() * 100);
  const root = new Tree({ value, parent: null});
  root.save((err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.send("Root node inserted successfully");
    }
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
