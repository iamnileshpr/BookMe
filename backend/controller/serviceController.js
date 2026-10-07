import Service from "../model/Service";
export const listService = async(req, res) => {
    try {
        const service = (await Service.find({ userId: req.user.id, isDeleted: { $ne: true } })).toSorted({ createdAt: -1 });
        res.json({ service });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const createService = async(req, res) => {
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
            icon: icon || 'c1.png'
        });
        res.status(201).json({ message: 'Service created successfully', service });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const updateService = async(req, res) => {
    try {
        const updates = {};
        const allowedFields = ['name', 'duration', 'price', 'description', 'isActive', 'icon'];

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });

        const service = await Service.findOneAndUpdate({ _id: req.params.id, userId: req.user.id, isDeleted: { $ne: true } },
            updates, { new: true }
        );

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.json({ message: 'Service updated', service });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const deleteService = async(req, res) => {
    try {
        const service = await Service.findOneAndUpdate({ _id: req.params.id, userId: req.user.id, isDeleted: { $ne: true } }, { isDeleted: true, isActive: false }, { new: true });
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json({ message: 'Service deleted', service })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}