class Command:
    def __init__(self, name, description, execute_fn):
        self.name = name
        self.description = description
        self.execute = execute_fn

def sample_command(context):
    return f"Executed command with context: {context}"

# Register sample commands here or via a command registry pattern
commands = {
    "sample": Command("sample", "A sample command", sample_command),
}
