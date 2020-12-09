


// BOSMA validating form klus aanmaken
// const validateKlus = (req, res, next) => {
//     const { error } = KlussenSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next();
//     }
// };
// 
// 

// app.get('/:id', wrapAsync(async (req, res) => {
//     const wandeling = await (await Wandeling.findById(req.params.id).populate('recensies'));
//     res.render('wandelingen/show', { wandeling });
// }));

// app.get('/:id/edit', wrapAsync(async (req, res) => {
//     const wandeling = await Wandeling.findById(req.params.id)
//     res.render('wandelingen/edit', { wandeling });
// }));

// app.put('/:id', validateWandeling, wrapAsync(async (req, res) => {
//     const { id } = req.params;
//     const wandeling = await Wandeling.findByIdAndUpdate(id, { ...req.body.wandeling });
//     res.redirect(`/wandelingen/${wandeling._id}`)
// }));

// app.delete('/:id', wrapAsync(async (req, res) => {
//     const { id } = req.params;
//     await Wandeling.findByIdAndDelete(id);
//     res.redirect('/wandelingen');
// }));



// app.get('/:id/mijn-account', async (req, res) => {
//     const { gebruiker } = req.params;
//     const mijnKlussen = KlussenDb.find({ aanvrager: })
//     res.render('mijn-account', { gebruiker, mijnKlussen });
// })



// 

app.get('/aangemeld', (req, res) => {
    res.render('klus-lijst');
})
// 