const express = require('express');
const Article = require('../models/article.model');
const Avis = require('../models/avis.model');
const router = express.Router();

router.post('/add', async (req, res) => {
  try { await Article.create(req.body); res.status(201).json('article add !'); }
  catch (error) { res.status(500).json(error.message); }
});

router.get('/all', async (req, res) => {
  try {
    const { sortBy } = req.query;
    let q = Article.find().populate('user').populate({ path:'avis', populate:{ path:'user' } });
    if (sortBy === 'price_asc') q = q.sort({ price: 1 });
    if (sortBy === 'price_desc') q = q.sort({ price: -1 });
    const articles = await q.exec();
    res.status(200).json(articles);
  } catch (error) { res.status(500).json(error.message); }
});

router.get('/find/:id', async (req, res) => {
  try { 
    const article = await Article.findById(req.params.id).populate({ path:'avis', populate:{ path:'user' } }); 
    if (!article) return res.status(404).json('Article not found'); 
    res.status(200).json(article); }
  catch (error) { 
    res.status(500).json(error.message); 
  }
});

router.put('/update/:id', async (req, res) => {
  try { 
    const updated = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
    res.status(200).json(updated); }
  catch (error) { 
    res.status(500).json(error.message); 
  }
});

router.delete('/delete/:id', async (req, res) => {
  try { 
    await Article.findByIdAndDelete(req.params.id); 
    res.status(200).json('Article deleted'); 
  }
  catch (error) { 
    res.status(500).json(error.message); 
  }
});

router.put('/search/:id', async (req, res) => {
  try { 
    const article = await Article.findById(req.params.id).populate('user').populate('avis'); 
    if (!article) return res.status(404).json('Article not found'); 
    res.status(200).json(article);
   }
  catch (error) { 
    res.status(500).json(error.message); 
  }
});

router.get('/:id/avis', async (req, res) => {
  try { 
    const article = await Article.findById(req.params.id).populate({ path:'avis', populate:{ path:'user' } }); 
    if (!article) return res.status(404).json('Article not found'); 
    res.status(200).json(article.avis); 
  }
  catch (error) { 
    res.status(500).json(error.message);
   }
});

module.exports = router;
