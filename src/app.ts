import express from 'express';
import sequelize from './config/db.js';
import userRoutes from './routes/user.routes.js';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import fsy from 'fs';
import yaml from 'yaml';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api', userRoutes);

const swagger  = fsy.readFileSync('./swagger.yaml', 'utf8');
const swaggerDocument = yaml.parse(swagger);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

(async () => {
  await sequelize.sync({ alter: true });
})();

dotenv.config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
