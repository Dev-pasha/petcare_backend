const { models } = require("../../models");

const createSlotInStorage = async ({ slotData }) => {
  try {
    const response = await models.slot.create(slotData);
    return response;
  } catch (error) {
    console.log("catch of createSlotInStorage");
    console.log(error.message);
  }
};

const getSlotInStorage = async ({ doctorId }) => {
  try {
    const response = await models.slot.findAll({
      where: {
        doctorId: doctorId,
      },
    });
    return response;
  } catch (error) {
    console.log("catch of getSlotInStorage");
    console.log(error.message);
  }
};

const getSlotByIdInStorage = async ({ slotId }) => {
  try {
    const response = await models.slot.findOne({
      where: {
        slotId: slotId,
      },
    });
    return response;
  } catch (error) {
    console.log("catch of getSlotByIdInStorage");
    console.log(error.message);
  }
};

const updateSlotInStorage = async ({ slotData }) => {
  try {
    const exsistingSlot = await models.slot.findOne({
      where: {
        slotId: slotData.slotId,
      },
    });

    if (!exsistingSlot) {
      console.log("slot not found");
      throw new Error("slot not found");
    }

    const response = await exsistingSlot.update(slotData);
    return response;
  } catch (error) {
    console.log("catch of updateSlotInStorage");
    console.log(error.message);
  }
};

const deleteSlotInStorage = async ({ slotId }) => {
  try {
    const deleteSlot = await models.slot.destroy({
      where: {
        slotId,
      },
    });
    return deleteSlot;
  } catch (error) {
    console.log("catch of deleteSlotInStorage");
    console.log(error.message);
  }
};

module.exports = {
  createSlotInStorage,
  getSlotInStorage,
  getSlotByIdInStorage,
  updateSlotInStorage,
  deleteSlotInStorage,
};
