const express = require('express');
const Avis = require('../models/avis.model');
const Article = require('../models/article.model');
const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    const avis = await Avis.create(req.body);
    await Article.findByIdAndUpdate(req.body.article, { $push: { avis: avis._id } });
    res.status(201).json('avis add !');
  } catch (error) { 
    res.status(500).json(error.message); 
  }
});

router.get('/all', async (req, res) => {
  try { 
    const avis = await Avis.find().populate('user').populate('article'); 
    res.status(200).json(avis); 
  }
  catch (error) { 
    res.status(500).json(error.message); 
  }
});

router.get('/:id', async (req, res) => {
  try
   { 
    const avis = await Avis.findById(req.params.id).populate('user').populate('article'); 
    if (!avis) return res.status(404).json('Avis not found'); 
    res.status(200).json(avis); 
  }
  catch (error) 
  {
     res.status(500).json(error.message); 
  }
});

router.put('/update/:id', async (req, res) => {
  try { 
    const updated = await Avis.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
    res.status(200).json(updated); 
  }
  catch (error) { 
    res.status(500).json(error.message); 
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const avis = await Avis.findByIdAndDelete(req.params.id);
    if (avis) await Article.findByIdAndUpdate(avis.article, { $pull: { avis: avis._id } });
    res.status(200).json('Avis deleted');
  } 
  catch (error) { 
    res.status(500).json(error.message); 
  }
});

router.put('/search/:id', async (req, res) => {
  try { const avis = await Avis.findById(req.params.id).populate('user').populate('article'); 
    if (!avis) return res.status(404).json('Avis not found'); 
    res.status(200).json(avis); 
  }
  catch (error) {
     res.status(500).json(error.message); 
    }
});

module.exports = router;
