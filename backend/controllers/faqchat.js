const FAQChat = require("../models/FAQChat");
const queryCreator = require("../commonHelpers/queryCreator");
const _ = require("lodash");

exports.addSlide = (req, res, next) => {
    FAQChat.findOne({ customId: req.body.customId }).then(slide => {
        if (slide) {
            res.status(400).json({
                message: `Slide with customId '${slide.customId}' already exists. CustomId must be unique.`
            });
        } else {
            const slideData = _.cloneDeep(req.body);
            const newSlide = new FAQChat(queryCreator(slideData));

            newSlide.save()
                .then(slide => res.json(slide))
                .catch(err =>
                    res.status(400).json({
                        message: `Error occurred on server: "${err}" `
                    })
                );
        }
    });
};

exports.updateSlide = (req, res, next) => {
    FAQChat.findOne({ customId: req.params.customId })
        .then(slide => {
            if (!slide) {
                return res.status(400).json({
                    message: `Slide with customId "${req.params.customId}" not found.`
                });
            } else {
                const slideData = _.cloneDeep(req.body);
                const updatedSlide = queryCreator(slideData);

                FAQChat.findOneAndUpdate(
                    { customId: req.params.customId },
                    { $set: updatedSlide },
                    { new: true }
                )
                    .then(slide => res.json(slide))
                    .catch(err =>
                        res.status(400).json({
                            message: `Error occurred on server: "${err}" `
                        })
                    );
            }
        })
        .catch(err =>
            res.status(400).json({
                message: `Error occurred on server: "${err}" `
            })
        );
};

exports.deleteSlide = (req, res, next) => {
    FAQChat.findOne({ customId: req.params.customId }).then(async slide => {
        if (!slide) {
            return res.status(400).json({
                message: `Slide with customId "${req.params.customId}" not found.`
            });
        } else {
            const slideToDelete = await FAQChat.findOne({
                customId: req.params.customId
            });

            FAQChat.deleteOne({ customId: req.params.customId })
                .then(() =>
                    res.status(200).json({
                        message: `Slide with customId "${slideToDelete.customId}" successfully deleted from DB.`,
                        deletedSlideInfo: slideToDelete
                    })
                )
                .catch(err =>
                    res.status(400).json({
                        message: `Error occurred on server: "${err}" `
                    })
                );
        }
    });
};

exports.getSlides = (req, res, next) => {
    FAQChat.find()
        .then(slides => res.status(200).json(slides))
        .catch(err =>
            res.status(400).json({
                message: `Error occurred on server: "${err}" `
            })
        );
};
