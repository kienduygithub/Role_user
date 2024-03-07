import db from "../models";
const getGroupWithRole = async (user) => {
    try {
        let roles = await db.Group.findOne({
            where: { id: user.groupId },
            attributes: [ 'id', 'name', 'description' ],
            include: {
                model: db.Role,
                attributes: [ 'id', 'url', 'description' ],
                through: { attributes: [] }
            },
            nest: true,
        })
        return roles ? roles : {};
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getGroupWithRole
}