import GroupService from '../services/GroupService';

const readAllGroups = async (req, res) => {
    try {
        const response = await GroupService.readAllGroups();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'Error from server...',
            EC: -1,
            DT: ''
        })
    }
}

module.exports = {
    readAllGroups: readAllGroups,
}