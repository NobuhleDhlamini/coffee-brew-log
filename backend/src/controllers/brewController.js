require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const validateBrew = (data) => {
  const requiredFields = [
    "name",
    "method",
    "grindSize",
    "waterAmount",
    "coffeeAmount",
    "brewTime",
  ];

  return requiredFields.every(
    (field) =>
      data[field] !== undefined &&
      data[field] !== null &&
      String(data[field]).trim() !== ""
  );
};

const getBrews = async (req, res) => {
  try {
    const { method } = req.query;

    const brews = await prisma.brew.findMany({
      where: method ? { method } : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(brews);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve brews",
    });
  }
};

const getBrew = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const brew = await prisma.brew.findUnique({
      where: { id },
    });

    if (!brew) {
      return res.status(404).json({
        message: "Brew not found",
      });
    }

    res.status(200).json(brew);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve brew",
    });
  }
};

const createBrew = async (req, res) => {
  try {
    if (!validateBrew(req.body)) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const {
      name,
      method,
      grindSize,
      waterAmount,
      coffeeAmount,
      brewTime,
    } = req.body;

    const brew = await prisma.brew.create({
      data: {
        name,
        method,
        grindSize,
        waterAmount: Number(waterAmount),
        coffeeAmount: Number(coffeeAmount),
        brewTime: Number(brewTime),
      },
    });

    res.status(201).json(brew);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create brew",
    });
  }
};

const updateBrew = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!validateBrew(req.body)) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingBrew = await prisma.brew.findUnique({
      where: { id },
    });

    if (!existingBrew) {
      return res.status(404).json({
        message: "Brew not found",
      });
    }

    const {
      name,
      method,
      grindSize,
      waterAmount,
      coffeeAmount,
      brewTime,
    } = req.body;

    const brew = await prisma.brew.update({
      where: { id },
      data: {
        name,
        method,
        grindSize,
        waterAmount: Number(waterAmount),
        coffeeAmount: Number(coffeeAmount),
        brewTime: Number(brewTime),
      },
    });

    res.status(200).json(brew);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update brew",
    });
  }
};

const deleteBrew = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const existingBrew = await prisma.brew.findUnique({
      where: { id },
    });

    if (!existingBrew) {
      return res.status(404).json({
        message: "Brew not found",
      });
    }

    await prisma.brew.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete brew",
    });
  }
};

module.exports = {
  getBrews,
  getBrew,
  createBrew,
  updateBrew,
  deleteBrew,
};