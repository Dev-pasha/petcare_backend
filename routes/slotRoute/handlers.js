const {
  createSlotInStorage,
  getSlotInStorage,
  getSlotByIdInStorage,
  updateSlotInStorage,
  deleteSlotInStorage,
} = require("../../storage/slot/index");

function convertTo24Hour(time12) {
  const [time, period] = time12.split(" ");
  const [hours, minutes] = time.split(":").map(Number);

  if (period === "PM" && hours !== 12) {
    return `${hours + 12}:${minutes}`;
  }

  if (period === "AM" && hours === 12) {
    return `00:${minutes}`;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes}`;
}

function convertTo12Hour(time24) {
  const [hours, minutes] = time24.split(":").map(Number);

  if (hours === 0) {
    return `12:${minutes.toString().padStart(2, "0")} AM`;
  } else if (hours === 12) {
    return `12:${minutes.toString().padStart(2, "0")} PM`;
  } else if (hours > 12) {
    return `${hours - 12}:${minutes.toString().padStart(2, "0")} PM`;
  } else {
    return `${hours}:${minutes.toString().padStart(2, "0")} AM`;
  }
}

function calculateTimeSlots({ startTime, endTime, intervalMinutes }) {
  const startTime24 = convertTo24Hour(startTime);
  const endTime24 = convertTo24Hour(endTime);

  const startDateTime = new Date(`1970-01-01 ${startTime24}`);
  const endDateTime = new Date(`1970-01-01 ${endTime24}`);

  const timeSlotDurationMilliseconds = intervalMinutes * 60 * 1000;
  let currentTime = startDateTime;

  const timeSlots = [];

  while (currentTime <= endDateTime) {
    const startTime12 = convertTo12Hour(currentTime.toTimeString().slice(0, 5));
    const endTime12 = convertTo12Hour(
      new Date(currentTime.getTime() + timeSlotDurationMilliseconds)
        .toTimeString()
        .slice(0, 5)
    );

    const timeSlot = {
      start: startTime12,
      end: endTime12,
    };
    timeSlots.push(timeSlot);
    currentTime.setTime(currentTime.getTime() + timeSlotDurationMilliseconds);
  }

  return timeSlots;
}

async function createSlot(req, res) {
  const { slotDate, startTime, endTime, doctorId } = req.body;
  const intervalMinutes = 30;
  slotStatus = "available";

  try {
    const generatedSlots = calculateTimeSlots({
      startTime,
      endTime,
      intervalMinutes,
    });

    for (let i = 0; i < generatedSlots.length; i++) {
      const slotData = {
        slotDate,
        startTime: generatedSlots[i].start,
        endTime: generatedSlots[i].end,
        doctorId,
        slotStatus,
      };

      await createSlotInStorage({ slotData });
    }

    res.status(200).json({
      message: "slots created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getSlot(req, res) {
  try {
    const { doctorId } = req.query;
    const response = await getSlotInStorage({ doctorId });
    res.status(200).json({
      message: "slot fetched successfully",
      response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getSlotById(req, res) {
  const { slotId } = req.query;
  try {
    const response = await getSlotByIdInStorage({ slotId });
    res.status(200).json({
      message: "slot fetched successfully",
      response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateSlot(req, res) {
  console.log(req.body)
  const slotData = req.body;
  console.log(slotData);
  try {
    const response = await updateSlotInStorage({ slotData });
    res.status(200).json({
      message: "slot updated successfully",
      response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteSlot(req, res) {
  const { slotId } = req.query;
  try {
    const response = await deleteSlotInStorage({ slotId });
    res.status(200).json({
      message: "slot deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createSlot,
  getSlot,
  getSlotById,
  updateSlot,
  deleteSlot,
};
