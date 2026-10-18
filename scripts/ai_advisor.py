import os
import sys
from dotenv import load_dotenv
from openai import OpenAI

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Load variables from .env
load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

def get_ai_client():
    if not api_key or api_key == "your_openai_api_key_here":
        raise ValueError("Please set a valid OPENAI_API_KEY in your .env file.")
    return OpenAI(api_key=api_key)

def ask_pc_expert(prompt: str, build_context: dict = None) -> str:
    """
    Queries OpenAI as a specialized PC_DOCx Hardware Engineering Consultant.
    """
    client = get_ai_client()
    
    system_prompt = (
        "You are the PC_DOCx AI Hardware Engineer, specialized in PC hardware in India. "
        "Provide calm, highly technical, and precise hardware advice. Always mention Indian Rupee (₹) pricing, "
        "thermal requirements, bottleneck percentages, and socket upgrade longevity. "
        "Avoid gaming RGB hype; focus on value-per-watt and price-to-performance."
    )
    
    messages = [
        {"role": "system", "content": system_prompt}
    ]
    
    if build_context:
        messages.append({
            "role": "system",
            "content": f"Current Builder Context: {build_context}"
        })
        
    messages.append({"role": "user", "content": prompt})

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        temperature=0.3
    )

    return response.choices[0].message.content

if __name__ == "__main__":
    test_prompt = "Is Ryzen 5 7600 balanced with RTX 5070 for 1440p gaming under ₹1,00,000?"
    print(f"Testing PC_DOCx AI Advisor with prompt:\n\"{test_prompt}\"\n")
    try:
        reply = ask_pc_expert(test_prompt)
        print("Response:\n", reply)
    except Exception as e:
        print(f"Note: {e}")
