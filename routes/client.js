const { Router } = require('express');
const { resolve } = require('path');
const Plan = require('../models/Plan');
const Student = require('../models/student')

const router = Router();
router.get('/', (req, res) => {
    res.sendFile(resolve('views', 'index.html'));
});

router.get('/about', (req, res) => {
    res.sendFile(resolve('views', 'about.html'));
});
router.get('/contact', (req, res) => {
    res.sendFile(resolve('views', 'contact.html'));
});
router.get('/register', (req, res) => {
    res.sendFile(resolve('views', 'register.html'));
});
router.post('/register-submit', async (req, res) => {
    let { surname, first_name, other_name, dob, plan, email, phone, disability, gender, password } = req.body
    console.log(req.body);
    let student = new Student(surname, first_name, other_name, dob, plan, email, phone, disability, gender, password)
    await student.save()
    
})
router.get('/add-plan', (req, res) => {
    res.sendFile(resolve('views', 'add-plan.html'))
})
router.post('/add-plan', async (req, res) => {
    let { name, price, description } = req.body
    let plan = new Plan(name, price, description)
    await plan.save()
    res.redirect("/plans")
})
router.get('/plans', async (req, res) => {
    let plans = await Plan.fetch();    
    res.render('plans', {plans})
})
router.get('/edit-plan/:plan_id', async (req, res)=>{
    let plan = await Plan.findById(req.params.plan_id)
    if (plan) {
        res.render('edit-plan', {plan})
    } else {
        res.redirect('/plans')
    }
})
router.post('/edit-plan/:plan_id', async (req, res)=>{
    let plan = await Plan.findById(req.params.plan_id)
    let { name, price, description } = req.body
    plan.name = name
    plan.price = price
    plan.description = description
    await plan.update()
    res.redirect('/plans')
})
router.get('/delete-plan/:plan_id', async (req, res)=>{
    let plan = await Plan.findById(req.params.plan_id)
    await plan.delete()
    res.redirect('/plans')
});
module.exports = router;