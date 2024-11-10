import os
import shutil
from datetime import datetime

def sanitize_filename(filename):
    # Replace path separators with underscores
    return filename.replace('/', '_').replace('\\', '_')

def create_single_folder_backup():
    # Create backup folder with timestamp
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_folder = f'all_files_backup_{timestamp}'
    
    # Create the backup directory
    os.makedirs(backup_folder, exist_ok=True)
    
    # Get the current directory
    current_dir = os.getcwd()
    
    # Folders to exclude
    exclude_folders = {'node_modules', 'Client', 'mongoDB_Collections', 'khansaama-data-uploader'}
    # File extensions to exclude
    exclude_extensions = {'.zip', '.py'}
    
    # Set to keep track of used filenames
    used_filenames = set()
    
    # Walk through the directory
    for root, dirs, files in os.walk(current_dir):
        # Remove excluded directories from dirs list
        dirs[:] = [d for d in dirs if d not in exclude_folders]
        
        # Skip if we're in the backup folder itself
        if backup_folder in root:
            continue
        
        # Get relative path from current directory
        rel_path = os.path.relpath(root, current_dir)
        
        # Copy files
        for file in files:
            # Skip files with excluded extensions
            if not any(file.lower().endswith(ext) for ext in exclude_extensions):
                src_file = os.path.join(root, file)
                
                # Create new filename
                if rel_path == '.':
                    # Files in root directory
                    new_filename = file
                else:
                    # Files in subdirectories - prefix with folder name
                    name, ext = os.path.splitext(file)
                    folder_name = rel_path.replace(os.sep, '_')
                    new_filename = f"{folder_name}_{name}{ext}"
                
                # Make sure the new filename is unique
                final_filename = new_filename
                counter = 1
                while final_filename in used_filenames:
                    name, ext = os.path.splitext(new_filename)
                    final_filename = f"{name}_{counter}{ext}"
                    counter += 1
                
                used_filenames.add(final_filename)
                dst_file = os.path.join(backup_folder, final_filename)
                
                try:
                    shutil.copy2(src_file, dst_file)
                    print(f"Copied: {src_file} -> {dst_file}")
                except Exception as e:
                    print(f"Error copying {src_file}: {str(e)}")

if __name__ == "__main__":
    try:
        create_single_folder_backup()
        print("\nBackup completed successfully!")
    except Exception as e:
        print(f"\nAn error occurred: {str(e)}")
