import Service from "../model/Service";
export const listService = async(req, res) => {
    try {
        const service = (await Service.find({ userId: req.user.id, isDeleted: { $ne: true } })).toSorted({ createdAt: -1 });
        res.json({ service });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const creatService = async(req, res) => {
    try {
        const { name, duration, price, description, icon } = req.body;

        if (!name || !duration) {
            return res.status(400).json({ message: 'Name, duration, and price are required' });
        }

        const service = await Service.create({
            userId: req.user.id,
            name,
            duration,
            price: price || 0,
            description,
            icon
        });
    } catch (error) {

    }
}