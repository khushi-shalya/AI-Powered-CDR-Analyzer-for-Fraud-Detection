import pandas as pd

# Simulate Call Data (in real app, fetch from DB)
def load_call_data():
    # Simulate 500 call entries
    data = {
        "Caller": [f"User_{i}" for i in range(1, 501)],
        "Receiver": [f"User_{i+1}" for i in range(1, 501)],
        "Time": pd.date_range("2025-07-01", periods=500, freq="H"),
        "Duration": [i % 300 for i in range(500)],
        "Latitude": [28.6 + (i % 10) * 0.01 for i in range(500)],
        "Longitude": [77.2 + (i % 10) * 0.01 for i in range(500)],
    }
    return pd.DataFrame(data)

def show_calls(start_index=0, page_size=50):
    df = load_call_data()
    paged_df = df.iloc[start_index:start_index + page_size]
    print(paged_df[["Caller", "Receiver", "Time", "Duration", "Latitude", "Longitude"]])

    # Logic to check for "Load more"
    if start_index + page_size < len(df):
        next_page = input("\nLoad more? (y/n): ")
        if next_page.lower() == 'y':
            show_calls(start_index + page_size, page_size)
