import 'dotenv/config';
import mongoose, { connect } from 'mongoose';
import SeedQuizs, { quizData } from './_seedData/quiz';
import { QuizSchema } from '../schemas/quiz.schema';

export interface SeedDataModel {
  data: any[];
  collectionName: string;
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Define Mongoose model based on the schema
const QuizModel = mongoose.model('quizs', QuizSchema);

const seed = async () => {
  try {
    try {
      // Insert quiz data
      await QuizModel.insertMany(quizData);
      console.log('Quiz data seeded successfully');
    } catch (error) {
      console.error('Error seeding quiz data:', error);
    } finally {
      // Close the database connection
      mongoose.connection.close();
    }
  } catch (err) {
    console.log(err);
  }
};

seed().then(() => console.log('Seed success'));
