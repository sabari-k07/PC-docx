import os
import sys
from dotenv import load_dotenv
from openai import OpenAI

# Ensure UTF-8 output on Windows consoles
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

SYSTEM_PROMPT = """You are the PC_DOCx AI Hardware Engineering Specialist — India's premier intelligent PC building advisor.
Your tone is calm, precise, objective, and deeply technical (Linear/Apple/Vercel engineering mindset).
Rules:
1. Always calculate and specify Indian Rupee (₹) prices with Indian comma notation (e.g., ₹1,00,000, ₹55,000).
2. Consider Indian retail availability (PrimeABGB, MDComputers, Vedant Computers, Amazon India).
3. Evaluate PSU headroom, thermal envelopes in Indian summer climate (35°C+ ambient), and socket longevity (AM5 vs LGA1700).
4. Emphasize performance-per-rupee-per-watt (Efficiency Quotient).
5. Never use generic marketing fluff or RGB neon clichés. Provide direct, actionable component recommendations.
"""

def main():
    print("=" * 65)
    print("  🖥️  PC_DOCx Hardware AI Consultant (Terminal Chatbot)")
    print("=" * 65)
    
    if not api_key or api_key == "your_openai_api_key_here":
        print("\n[!] Notice: OPENAI_API_KEY is not configured in your .env file.")
        print("    Please add your API key to .env:")
        print("    OPENAI_API_KEY=sk-proj-...")
        print("\n    Running in Offline Demo Mode. Type 'exit' to quit.\n")
        run_offline_mode()
        return

    try:
        client = OpenAI(api_key=api_key)
    except Exception as e:
        print(f"\n[!] Error initializing OpenAI client: {e}")
        return

    conversation_history = [
        {"role": "system", "content": SYSTEM_PROMPT}
    ]

    print("\n✓ Connected to OpenAI. Model: gpt-4o-mini")
    print("Ask any question regarding PC components, bottlenecks, budgets, or benchmarks.")
    print("Type 'exit' or 'quit' to end session.\n" + "-" * 65 + "\n")

    while True:
        try:
            user_input = input("Builder: ").strip()
            if not user_input:
                continue
            if user_input.lower() in ['exit', 'quit', 'q']:
                print("\nEnding PC_DOCx session. Happy building!\n")
                break

            conversation_history.append({"role": "user", "content": user_input})
            print("\nPC_DOCx AI: ", end="", flush=True)

            # Stream response for real-time typewriter experience
            stream = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=conversation_history,
                temperature=0.3,
                stream=True
            )

            full_reply = ""
            for chunk in stream:
                content = chunk.choices[0].delta.content or ""
                full_reply += content
                print(content, end="", flush=True)
            print("\n\n" + "-" * 65 + "\n")

            conversation_history.append({"role": "assistant", "content": full_reply})

        except KeyboardInterrupt:
            print("\n\nSession terminated by user.")
            break
        except Exception as e:
            print(f"\n[!] API Error: {e}\n")

def run_offline_mode():
    sample_answers = {
        "budget": "For ₹1,00,000, our canonical 1440p recommendation pairs AMD Ryzen 5 7600 (₹17,500) with NVIDIA RTX 5070 12GB (₹55,000) on an MSI B650M-P board (₹9,500), offering 100% compatibility and 92/100 Build Score.",
        "bottleneck": "At 1440p High settings, the Ryzen 5 7600 will not bottleneck an RTX 5070. GPU utilization remains above 96% in modern AAA titles.",
        "psu": "A 650W 80+ Bronze unit provides 438W peak load headroom (67% utilization). For future 80-class GPU upgrades, a 750W 80+ Gold modular PSU is recommended."
    }
    while True:
        try:
            q = input("Builder (Offline): ").strip()
            if not q or q.lower() in ['exit', 'quit', 'q']:
                break
            matched = False
            for key, val in sample_answers.items():
                if key in q.lower():
                    print(f"\nPC_DOCx AI (Simulated): {val}\n")
                    matched = True
                    break
            if not matched:
                print("\nPC_DOCx AI (Simulated): Please configure your OPENAI_API_KEY in .env to enable unrestricted real-time AI reasoning.\n")
        except (KeyboardInterrupt, EOFError):
            break

if __name__ == "__main__":
    main()
