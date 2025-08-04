import json
import string
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load FAQ data
with open("faqs.json", "r") as file:
    faqs = json.load(file)

questions = [faq["question"] for faq in faqs]
answers = [faq["answer"] for faq in faqs]

# Preprocess text
def preprocess(text):
    text = text.lower().translate(str.maketrans('', '', string.punctuation))
    return text

# Vectorize the questions
vectorizer = TfidfVectorizer()
question_vectors = vectorizer.fit_transform([preprocess(q) for q in questions])

# Get best-matching answer
def get_answer(user_input):
    user_input_processed = preprocess(user_input)
    user_vector = vectorizer.transform([user_input_processed])
    similarity_scores = cosine_similarity(user_vector, question_vectors)
    best_match_idx = similarity_scores.argmax()
    best_score = similarity_scores[0][best_match_idx]

    if best_score > 0.3:  # Confidence threshold
        return answers[best_match_idx]
    else:
        return "Sorry, I don't understand that question. Please try asking something else."
