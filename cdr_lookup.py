import pandas as pd
import numpy as np
import re

# --- Configuration ---
CDR_DATA_URL = 'https://raw.githubusercontent.com/jamesrawlins1000/Telecom-CDR-Dataset-/master/Call%20Details-Data.csv'

# --- 1. Data Import ---
print("--- Step 1: Importing Data ---")

df_cdrs = None # Initialize df_cdrs to None

try:
    df_cdrs = pd.read_csv(CDR_DATA_URL)
    print("Dataset loaded successfully from GitHub.")
    print(f"Initial data shape: {df_cdrs.shape[0]} rows, {df_cdrs.shape[1]} columns")
except Exception as e:
    print(f"Error loading dataset from URL: {e}")
    print("Falling back to creating dummy data for demonstration purposes.")
    dummy_data = {
        'State': ['GA', 'NY', 'TX', 'CA', 'GA', 'FL'],
        'Account length': [100, 120, 80, 150, 90, 115],
        'Phone number': ['404-555-1234', '212-555-5678', '713-555-9012', '415-555-3456', '404-555-1234', '305-555-7890'],
        'International plan': ['no', 'yes', 'no', 'no', 'yes', 'no'],
        'Voice mail plan': ['yes', 'no', 'yes', 'yes', 'no', 'yes'],
        'Number vmail messages': [10, 0, 5, 20, 0, 12],
        'Total day minutes': [200.0, 150.0, 250.0, 180.0, 210.0, 175.0],
        'Total day calls': [100, 80, 120, 90, 110, 88],
        'Total day charge': [34.0, 25.5, 42.5, 30.6, 35.7, 29.75],
        'Total eve minutes': [210.0, 180.0, 230.0, 190.0, 200.0, 220.0],
        'Total eve calls': [90, 70, 110, 85, 95, 102],
        'Total eve charge': [17.85, 15.3, 19.55, 16.15, 17.0, 18.7],
        'Total night minutes': [205.0, 195.0, 215.0, 200.0, 205.0, 190.0],
        'Total night calls': [100, 95, 105, 100, 100, 92],
        'Total night charge': [9.22, 8.78, 9.68, 9.0, 9.22, 8.55],
        'Total intl minutes': [10.0, 12.0, 8.0, 11.0, 13.0, 9.5],
        'Total intl calls': [2, 3, 1, 2, 4, 1],
        'Total intl charge': [2.7, 3.24, 2.16, 2.97, 3.51, 2.57],
        'Customer service calls': [1, 2, 0, 1, 3, 0],
        'Churn': ['False.', 'False.', 'False.', 'False.', 'True.', 'False.']
    }
    df_cdrs = pd.DataFrame(dummy_data)
    print("Using dummy data for demonstration.")

if df_cdrs is None:
    print("FATAL ERROR: Could not load data from URL or create dummy data. Exiting.")
    exit()

print("\nFirst 5 rows of the raw dataset:")
print(df_cdrs.head())
print("\nInitial Dataset Information:")
df_cdrs.info()

# --- 2. Data Cleaning and Preprocessing ---
print("\n--- Step 2: Data Cleaning and Preprocessing ---")

# Apply cleaning to column names
# This is the line that caused the shortening of names
df_cdrs.columns = df_cdrs.columns.str.lower().str.replace(' ', '_').str.replace('.', '', regex=False)
df_cdrs.rename(columns={'phone_number': 'caller_id'}, inplace=True)

df_cdrs['churn'] = df_cdrs['churn'].replace({'False.': False, 'True.': True}).astype(bool)

df_cdrs['caller_id_clean'] = df_cdrs['caller_id'].str.replace(r'\D', '', regex=True)

initial_rows = df_cdrs.shape[0]
df_cdrs.dropna(subset=['caller_id_clean'], inplace=True)
if df_cdrs.shape[0] < initial_rows:
    print(f"Removed {initial_rows - df_cdrs.shape[0]} rows due to missing caller IDs.")

print("\n--- ACTUAL COLUMN NAMES AFTER CLEANING ---")
print(df_cdrs.columns.tolist()) # This is the definitive list you provided!
print("------------------------------------------")

print(f"Data shape after cleaning: {df_cdrs.shape[0]} rows, {df_cdrs.shape[1]} columns")
print("\nCleaned Dataset Information (showing new columns and types):")
df_cdrs.info()
print("\nFirst 5 rows of cleaned data (Pandas might truncate this display):")
print(df_cdrs.head())


# --- 3. Function to Look Up Caller Information ---
def get_caller_info(df, caller_id_input):
    """
    Looks up information for a given caller ID in the DataFrame.
    """
    cleaned_input_id = re.sub(r'\D', '', str(caller_id_input)).strip()

    if not cleaned_input_id:
        return None

    caller_records = df[df['caller_id_clean'].str.contains(cleaned_input_id, na=False)]

    if caller_records.empty:
        return None
    else:
        # --- FINAL CORRECTED display_columns LIST ---
        # This list now perfectly matches the output you provided for df_cdrs.columns.tolist()
        # Removed 'churn' from this list as per your request.
        display_columns = [
            'caller_id', 'state', 'account_length', 'international_plan',
            'voice_mail_plan', 'vmail_message',
            'day_mins', 'day_calls', 'day_charge',
            'eve_mins', 'eve_calls', 'eve_charge',
            'night_mins', 'night_calls', 'night_charge',
            'intl_mins', 'intl_calls', 'intl_charge',
            'custserv_calls'
            # 'churn' -- Churn is commented out here if you don't want to see it
        ]

        # This robust selection handles cases where some desired columns might still be missing
        existing_display_columns = [col for col in display_columns if col in df.columns]

        if not existing_display_columns:
            print("Warning: No specified display columns found in the DataFrame. Displaying all available columns for the record.")
            return caller_records # Fallback: display all columns
        else:
            return caller_records[existing_display_columns]

# --- 4. User Interaction Loop ---
print("\n--- Step 3: Caller Information Lookup ---")
print("Enter a Caller ID (e.g., 404-555-1234, 2125555678, or just part of it like 404555).")
print("Type 'quit' to exit the program.")

while True:
    user_input_id = input("\nEnter Caller ID: ")

    if user_input_id.lower() == 'quit':
        print("Exiting lookup. Goodbye!")
        break

    found_info = get_caller_info(df_cdrs, user_input_id)

    if found_info is None:
        print(f"No records found for Caller ID matching: '{user_input_id}'")
        print("Please try a different Caller ID. Examples from dummy data: '404-555-1234', '2125555678', '713-555-9012'")
    else:
        print(f"\nInformation for Caller ID matching: '{user_input_id}'")
        print(found_info.to_string()) # Use .to_string() for full display

print("\n--- Program Finished ---")