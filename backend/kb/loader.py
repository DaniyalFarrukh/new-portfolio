import json
import os
import uuid

def load_json(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)

def generate_profile_chunks(profile_data):
    chunks = []
    text = (f"My name is {profile_data.get('name')}. "
            f"I am an {profile_data.get('title')} located in {profile_data.get('location')}. "
            f"Summary: {profile_data.get('summary')} "
            f"You can contact me via email at {profile_data.get('email')} or visit my LinkedIn at {profile_data.get('linkedin_url')} "
            f"and my GitHub at {profile_data.get('github_url')}. "
            f"My portfolio is at {profile_data.get('portfolio_url')}. "
            f"Availability: {profile_data.get('availability')}")
    
    chunks.append({
        "id": str(uuid.uuid4()),
        "text": text,
        "source_file": "profile.json",
        "metadata": {"type": "profile"}
    })
    return chunks

def generate_experience_chunks(experience_data):
    chunks = []
    for exp in experience_data:
        text = (f"I worked at {exp.get('company')} as a {exp.get('role')} "
                f"from {exp.get('start_date')} to {exp.get('end_date')}. "
                f"My responsibilities included: {', '.join(exp.get('responsibilities', []))}. "
                f"The tech stack I used there was: {', '.join(exp.get('tech_stack', []))}.")
        chunks.append({
            "id": str(uuid.uuid4()),
            "text": text,
            "source_file": "experience.json",
            "metadata": {"type": "experience", "company": exp.get('company')}
        })
    return chunks

def generate_projects_chunks(projects_data):
    chunks = []
    for proj in projects_data:
        text = (f"I built a project called {proj.get('title')}. "
                f"Description: {proj.get('description')} "
                f"It features: {', '.join(proj.get('key_features', []))}. "
                f"The tech stack used is: {', '.join(proj.get('tech_stack', []))}. "
                f"It is categorized as {proj.get('category')}. "
                f"GitHub link: {proj.get('github_url')}. "
                f"Live link: {proj.get('live_url')}.")
        chunks.append({
            "id": str(uuid.uuid4()),
            "text": text,
            "source_file": "projects.json",
            "metadata": {"type": "project", "title": proj.get('title')}
        })
    return chunks

def generate_skills_chunks(skills_data):
    chunks = []
    categories = skills_data.get('categories', {})
    for category, skills_list in categories.items():
        text = (f"My skills in the '{category}' category include: "
                f"{', '.join(skills_list)}.")
        chunks.append({
            "id": str(uuid.uuid4()),
            "text": text,
            "source_file": "skills.json",
            "metadata": {"type": "skill", "category": category}
        })
    return chunks

def load_all_chunks(kb_dir="."):
    all_chunks = []
    
    try:
        profile_data = load_json(os.path.join(kb_dir, "profile.json"))
        all_chunks.extend(generate_profile_chunks(profile_data))
    except FileNotFoundError:
        pass

    try:
        exp_data = load_json(os.path.join(kb_dir, "experience.json"))
        all_chunks.extend(generate_experience_chunks(exp_data))
    except FileNotFoundError:
        pass

    try:
        proj_data = load_json(os.path.join(kb_dir, "projects.json"))
        all_chunks.extend(generate_projects_chunks(proj_data))
    except FileNotFoundError:
        pass

    try:
        skills_data = load_json(os.path.join(kb_dir, "skills.json"))
        all_chunks.extend(generate_skills_chunks(skills_data))
    except FileNotFoundError:
        pass

    return all_chunks

if __name__ == "__main__":
    chunks = load_all_chunks(os.path.dirname(__file__))
    print(f"Loaded {len(chunks)} chunks.")
    for chunk in chunks[:2]:
        print(chunk)
