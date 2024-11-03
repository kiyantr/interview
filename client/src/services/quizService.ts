class QuizService {
  async getQuizzes() {
    try {
      const result = await fetch('http://localhost:3001/quiz', {
        method: 'GET',
      });
      if (!result.ok) {
        throw new Error('Get quiz error');
      }
      return await result.json();
    } catch (error) {
      console.error(error);
    }
    return [];
  }
}

export default new QuizService();
