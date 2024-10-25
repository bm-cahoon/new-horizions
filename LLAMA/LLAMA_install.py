from transformers import AutoModelForCausalLM, AutoTokenizer

model_name = "meta-llama/Llama-2-7b"  # Example, check the exact model
model = AutoModelForCausalLM.from_pretrained(3.2)
tokenizer = AutoTokenizer.from_pretrained(3.2)
