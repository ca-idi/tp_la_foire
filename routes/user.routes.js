const express = require('express');
const User = require('../../projet/models/user.model');
const router = express.Router();

router.post('/add', async (req, res) => {
  try { 
    await User.create(req.body); 
    res.status(201).json('user add !'); 
  } catch (error) { 
    res.status(500).json(error.message); 
  }
});

router.get('/all', async (req, res) => {
  try { 
    const users = await User.find(); 
    res.status(200).json(users); }
  catch (error) { 
    res.status(500).json(error.message); 
  }
});

router.get('/:id', async (req, res) => {
  try { 
    const user = await User.findById(req.params.id); 
    if (!user) return res.status(404).json('User not found'); 
    res.status(200).json(user); 
  }
  catch (error) { 
    res.status(500).json(error.message); 
  }
});

router.put('/update/:id', async (req, res) => {
  try { 
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
    res.status(200).json(updated); 
  }
  catch (error) { 
    res.status(500).json(error.message); 
  }
});

router.delete('/delete/:id', async (req, res) => {
  try { 
    await User.findByIdAndDelete(req.params.id); 
    res.status(200).json('User deleted'); 
  }
  catch (error) { 
    res.status(500).json(error.message); 
  }
});

router.put('/search/:id', async (req, res) => {
  try { 
    const user = await User.findById(req.params.id); 
    if (!user) return res.status(404).json('User not found'); 
    res.status(200).json(user); }
  catch (error) { 
    res.status(500).json(error.message); 
  }
});

module.exports = router;
