import asyncio
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.db.database import async_session, engine, Base
from app.db.models import User, Problem
from app.middleware.auth import hash_password


async def seed():
    print("Resetting database...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    print("Database reset complete.")

    async with async_session() as db:
        # USERS
        users_data = [
            ("alexdev", "alex@example.com", "Alex", "AL", 1648, 127, 42, 18, 186),
            ("nightowl", "nightowl@example.com", "Zara Chen", "NC", 2147, 1, 312, 45, 891),
            ("rustacean42", "rusty@example.com", "Dmitri", "RV", 2098, 2, 287, 62, 743),
            ("bytecruncher", "byte@example.com", "Aisha", "BP", 2061, 3, 265, 58, 682),
            ("nullptr_fan", "null@example.com", "Liam", "LO", 1987, 4, 234, 71, 654),
        ]

        users = []
        for username, email, name, avatar, rating, rank, wins, losses, solved in users_data:
            user = User(
                username=username, email=email,
                password_hash=hash_password("password123"),
                name=name, avatar=avatar, rating=rating, rank=rank,
                wins=wins, losses=losses, solved=solved,
                languages=["JavaScript", "Python"],
            )
            db.add(user)
            users.append(user)

        await db.flush()
        print(f"Inserted {len(users)} users.")

        # PROBLEMS
        problems_data = [
            (1, "Two Sum", "Easy", ["Array", "Hash Map"], 49.2,
             "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
             ["2 ≤ nums.length ≤ 10⁴", "-10⁹ ≤ nums[i] ≤ 10⁹", "Only one valid answer exists."],
             [{"input": "nums = [2,7,11,15], target = 9", "output": "[0,1]", "explanation": "Because nums[0] + nums[1] == 9."}],
             """function twoSum(nums, target) {\n  // Write your solution here\n}""",
             [{"args": [[2,7,11,15], 9], "expected": [0,1]}, {"args": [[3,2,4], 6], "expected": [1,2]}, {"args": [[3,3], 6], "expected": [0,1]}]),

            (2, "Two Sum II", "Medium", ["Array", "Two Pointers"], 55.0,
             "Given a 1-indexed array of integers `numbers` that is already sorted in non-decreasing order, find two numbers that add up to `target`.",
             ["2 ≤ numbers.length ≤ 3 × 10⁴", "-10⁴ ≤ numbers[i] ≤ 10⁴"],
             [{"input": "numbers = [2,7,11,15], target = 9", "output": "[1,2]"}],
             """function twoSumII(numbers, target) {\n  // Write your solution here\n}""",
             [{"args": [[2,7,11,15], 9], "expected": [1,2]}, {"args": [[2,3,4], 6], "expected": [1,3]}, {"args": [-1,0], "expected": [1,2]}]),

            (3, "Valid Parentheses", "Easy", ["Stack", "String"], 40.7,
             "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
             ["1 ≤ s.length ≤ 10⁴"],
             [{"input": 's = "()"', "output": "true"}],
             """function isValid(s) {\n  // Write your solution here\n}""",
             [{"args": ["()"], "expected": True}, {"args": ["()[]{}"], "expected": True}, {"args": ["(]"], "expected": False}, {"args": ["{[]}"], "expected": True}]),

            (4, "Merge Two Sorted Lists", "Easy", ["Linked List", "Recursion"], 62.7,
             "Merge two sorted linked lists and return it as a sorted list.",
             ["The number of nodes in both lists is in the range [0, 50]."],
             [{"input": "l1 = [1,2,4], l2 = [1,3,4]", "output": "[1,1,2,3,4,4]"}],
             """function mergeTwoLists(l1, l2) {\n  // Write your solution here\n}""",
             [{"args": [[1,2,4], [1,3,4]], "expected": [1,1,2,3,4,4]}, {"args": [[], []], "expected": []}, {"args": [[], [0]], "expected": [0]}]),

            (5, "Best Time to Buy and Sell Stock", "Easy", ["Array", "DP"], 54.5,
             "You are given an array `prices` where prices[i] is the price of a given stock on the ith day. Find the maximum profit.",
             ["1 ≤ prices.length ≤ 10⁵"],
             [{"input": "prices = [7,1,5,3,6,4]", "output": "5"}],
             """function maxProfit(prices) {\n  // Write your solution here\n}""",
             [{"args": [[7,1,5,3,6,4]], "expected": 5}, {"args": [[7,6,4,3,1]], "expected": 0}]),

            (6, "Contains Duplicate", "Easy", ["Array", "Hash Map"], 61.5,
             "Given an integer array `nums`, return true if any value appears at least twice.",
             ["1 ≤ nums.length ≤ 10⁵"],
             [{"input": "nums = [1,2,3,1]", "output": "true"}],
             """function containsDuplicate(nums) {\n  // Write your solution here\n}""",
             [{"args": [[1,2,3,1]], "expected": True}, {"args": [[1,2,3,4]], "expected": False}, {"args": [[1,1,1,3,3,4,3,2,4,2]], "expected": True}]),

            (7, "Maximum Subarray", "Medium", ["Array", "DP"], 50.3,
             "Find the subarray with the largest sum and return its sum.",
             ["1 ≤ nums.length ≤ 10⁵"],
             [{"input": "nums = [-2,1,-3,4,-1,2,1,-5,4]", "output": "6"}],
             """function maxSubArray(nums) {\n  // Write your solution here\n}""",
             [{"args": [[-2,1,-3,4,-1,2,1,-5,4]], "expected": 6}, {"args": [[1]], "expected": 1}, {"args": [[5,4,-1,7,8]], "expected": 23}]),

            (8, "Climbing Stairs", "Easy", ["DP", "Math"], 51.7,
             "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. How many distinct ways can you climb to the top?",
             ["1 ≤ n ≤ 45"],
             [{"input": "n = 2", "output": "2"}],
             """function climbStairs(n) {\n  // Write your solution here\n}""",
             [{"args": [2], "expected": 2}, {"args": [3], "expected": 3}, {"args": [1], "expected": 1}, {"args": [5], "expected": 8}]),

            (9, "Binary Search", "Easy", ["Array", "Binary Search"], 55.8,
             "Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search target in nums.",
             ["1 ≤ nums.length ≤ 10⁴"],
             [{"input": "nums = [-1,0,3,5,9,12], target = 9", "output": "4"}],
             """function search(nums, target) {\n  // Write your solution here\n}""",
             [{"args": [[-1,0,3,5,9,12], 9], "expected": 4}, {"args": [[-1,0,3,5,9,12], 2], "expected": -1}]),

            (10, "Two Sum (Hash Map)", "Easy", ["Array", "Hash Map"], 49.2,
             "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. Use a hash map.",
             ["2 ≤ nums.length ≤ 10⁴"],
             [{"input": "nums = [2,7,11,15], target = 9", "output": "[0,1]"}],
             """function twoSumHashMap(nums, target) {\n  // Write your solution here\n}""",
             [{"args": [[2,7,11,15], 9], "expected": [0,1]}, {"args": [[3,2,4], 6], "expected": [1,2]}, {"args": [[3,3], 6], "expected": [0,1]}]),

            (11, "Reverse String", "Easy", ["Two Pointers", "String"], 78.0,
             "Write a function that reverses a string. The input string is given as an array of characters `s`.",
             ["1 ≤ s.length ≤ 10⁵"],
             [{"input": 's = ["h","e","l","l","o"]', "output": '["o","l","l","e","h"]'}],
             """function reverseString(s) {\n  // Write your solution here\n}""",
             [{"args": [["h","e","l","l","o"]], "expected": ["o","l","l","e","h"]}, {"args": [["H","a","n","n","a","h"]], "expected": ["h","a","n","n","a","H"]}]),

            (12, "FizzBuzz", "Easy", ["Math", "Simulation"], 64.0,
             "Given an integer n, return a string array answer (1-indexed) where answer[i] == "FizzBuzz" if i is divisible by 3 and 5.",
             ["1 ≤ n ≤ 10⁴"],
             [{"input": "n = 5", "output": '["1","2","Fizz","4","Buzz"]'}],
             """function fizzBuzz(n) {\n  // Write your solution here\n}""",
             [{"args": [5], "expected": ["1","2","Fizz","4","Buzz"]}, {"args": [15], "expected": ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]}]),

            (13, "Valid Anagram", "Easy", ["Hash Map", "String"], 62.0,
             "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
             ["1 ≤ s.length, t.length ≤ 5 × 10⁴"],
             [{"input": 's = "anagram", t = "nagaram"', "output": "true"}],
             """function isAnagram(s, t) {\n  // Write your solution here\n}""",
             [{"args": ["anagram", "nagaram"], "expected": True}, {"args": ["rat", "car"], "expected": False}]),

            (14, "Missing Number", "Easy", ["Math", "Bit Manipulation"], 65.0,
             "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing.",
             ["n == nums.length", "0 ≤ nums[i] ≤ n"],
             [{"input": "nums = [3,0,1]", "output": "2"}],
             """function missingNumber(nums) {\n  // Write your solution here\n}""",
             [{"args": [[3,0,1]], "expected": 2}, {"args": [[0,1]], "expected": 2}, {"args": [[9,6,4,2,3,5,7,0,1]], "expected": 8}]),

            (15, "Majority Element", "Easy", ["Array", "Hash Map"], 64.0,
             "Given an array nums of size n, return the majority element (appears more than ⌊n/2⌋ times).",
             ["n == nums.length", "1 ≤ n ≤ 5 × 10⁴"],
             [{"input": "nums = [3,2,3]", "output": "3"}],
             """function majorityElement(nums) {\n  // Write your solution here\n}""",
             [{"args": [[3,2,3]], "expected": 3}, {"args": [[2,2,1,1,1,2,2]], "expected": 2}]),

            (16, "Merge Sorted Array", "Easy", ["Array", "Two Pointers"], 50.0,
             "You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n representing the number of elements.",
             ["nums1.length == m + n"],
             [{"input": "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3", "output": "[1,2,2,3,5,6]"}],
             """function merge(nums1, m, nums2, n) {\n  // Write your solution here\n}""",
             [{"args": [[1,2,3,0,0,0], 3, [2,5,6], 3], "expected": [1,2,2,3,5,6]}, {"args": [[0], 0, [1], 1], "expected": [1]}]),

            (17, "Invert Binary Tree", "Easy", ["Tree", "DFS"], 75.0,
             "Given the root of a binary tree, invert the tree, and return its root.",
             [],
             [{"input": "root = [4,2,7,1,3,6,9]", "output": "[4,7,2,9,6,3,1]"}],
             """function invertTree(root) {\n  // Write your solution here\n}""",
             [{"args": [[4,2,7,1,3,6,9]], "expected": [4,7,2,9,6,3,1]}, {"args": [[2,1,3]], "expected": [2,3,1]}, {"args": [[]], "expected": []}]),

            (18, "Valid Palindrome", "Easy", ["Two Pointers", "String"], 46.0,
             "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
             ["1 ≤ s.length ≤ 2 × 10⁵"],
             [{"input": 's = "A man, a plan, a canal: Panama"', "output": "true"}],
             """function isPalindrome(s) {\n  // Write your solution here\n}""",
             [{"args": ["A man, a plan, a canal: Panama"], "expected": True}, {"args": ["race a car"], "expected": False}, {"args": [" "], "expected": True}]),

            (19, "Array Transformation", "Medium", ["Array", "Math"], 0.0,
             "Given an array of integers `nums` and an integer `k`, transform each element: multiply by k if index is even, add k if odd. Filter out elements ≤ 0.",
             ["1 ≤ nums.length ≤ 10^5", "−10^4 ≤ nums[i] ≤ 10^4", "1 ≤ k ≤ 100"],
             [{"input": "nums = [1, 2, 3, 4, 5], k = 2", "output": "[2, 4, 6, 8, 10]"}],
             """function transformArray(nums, k) {\n  // Write your solution here\n}""",
             [{"args": [[1, 2, 3, 4, 5], 2], "expected": [2, 4, 6, 8, 10]}, {"args": [[-1, -2, 3, -4], 3], "expected": [6]}, {"args": [[0, 0, 0], 5], "expected": []}]),
        ]

        for p in problems_data:
            pid, title, difficulty, topics, acceptance, description, constraints, examples, starter_code, test_cases = p
            db.add(Problem(
                id=pid, title=title, difficulty=difficulty, topics=topics,
                acceptance=acceptance, description=description, constraints=constraints,
                examples=examples, starter_code=starter_code, test_cases=test_cases,
            ))

        print(f"Inserted {len(problems_data)} problems.")

        await db.commit()
        print("")
        print("=" * 50)
        print("Seed complete!")
        print(f"Users:    {len(users)}")
        print(f"Problems: {len(problems_data)}")
        print("=" * 50)


if __name__ == "__main__":
    asyncio.run(seed())
