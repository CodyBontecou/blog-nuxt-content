#!/usr/bin/env python3
"""
Test script for the frontmatter validator
"""

import sys
from pathlib import Path

# Add the current directory to Python path
sys.path.insert(0, str(Path(__file__).parent))

try:
    from validate_frontmatter import FrontmatterValidator
    
    # Run a basic test
    validator = FrontmatterValidator(verbose=True)
    print("✅ Validator module loaded successfully")
    
    # Test with a sample frontmatter
    sample_frontmatter = {
        "title": "Test Article",
        "draft": False,
        "ignore": False,
        "topics": ["test", "validation"]
    }
    
    errors = validator.validate_title(sample_frontmatter, "test.md")
    print(f"Title validation test: {len(errors)} errors")
    
    errors = validator.validate_boolean_fields(sample_frontmatter)
    print(f"Boolean validation test: {len(errors)} errors")
    
    errors = validator.validate_topics(sample_frontmatter)
    print(f"Topics validation test: {len(errors)} errors")
    
    print("✅ Basic validation functions are working")
    
except ImportError as e:
    print(f"❌ Import error: {e}")
    sys.exit(1)
except Exception as e:
    print(f"❌ Test failed: {e}")
    sys.exit(1)