const test = require('node:test');
const assert = require('node:assert/strict');
const chatbotRoute = require('../routes/chatbotRoutes');
const { getMatchedProjectFact, buildDirectAnswer, looksGeneric } = chatbotRoute.__testables;

test('matches the project work fact', () => {
  const reply = getMatchedProjectFact('How does this project work?');
  assert.equal(reply, 'This project helps users discover government schemes, check eligibility, understand required documents, and get AI-powered guidance.');
});

test('builds a direct scheme answer', () => {
  const reply = buildDirectAnswer('Tell me about PM Internship Scheme');
  assert.equal(reply, 'PM Internship Scheme gives internship opportunities for youth.');
});

test('detects generic replies', () => {
  assert.equal(looksGeneric('I can help with questions about this project, government schemes, eligibility, documents, and how the platform works.'), true);
});
