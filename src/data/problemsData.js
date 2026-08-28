export const problems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    topics: ["Array", "Hash Map"],
    acceptance: 49.2,
    solved: true,
    attempted: false,
    isDaily: false,
    description:
      "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists.",
    ],
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "",
      },
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Write your solution here

}`,
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    topics: ["Linked List", "Math"],
    acceptance: 41.8,
    solved: true,
    attempted: false,
    isDaily: false,
    description:
      "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.\n\nYou may assume the two numbers do not contain any leading zero, except the number 0 itself.",
    constraints: [
      "The number of nodes in each linked list is in the range [1, 100].",
      "0 ≤ Node.val ≤ 9",
      "It is guaranteed that the list represents a number that does not have leading zeros.",
    ],
    examples: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "342 + 465 = 807.",
      },
      {
        input: "l1 = [0], l2 = [0]",
        output: "[0]",
        explanation: "",
      },
    ],
    starterCode: `/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbers(l1, l2) {
  // Write your solution here

}`,
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    topics: ["String", "Sliding Window"],
    acceptance: 34.5,
    solved: false,
    attempted: true,
    isDaily: false,
    description:
      "Given a string `s`, find the length of the longest substring without repeating characters.",
    constraints: [
      "0 ≤ s.length ≤ 5 × 10⁴",
      "s consists of English letters, digits, symbols and spaces.",
    ],
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 's = "bbbbb"',
        output: "1",
        explanation: 'The answer is "b", with the length of 1.',
      },
    ],
    starterCode: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
  // Write your solution here

}`,
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    topics: ["Array", "Binary Search", "Divide and Conquer"],
    acceptance: 38.1,
    solved: false,
    attempted: false,
    isDaily: false,
    description:
      "Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).",
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 ≤ m ≤ 1000",
      "0 ≤ n ≤ 1000",
      "1 ≤ m + n ≤ 2000",
      "-10⁶ ≤ nums1[i], nums2[i] ≤ 10⁶",
    ],
    examples: [
      {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.00000",
        explanation: "merged array = [1,2,3] and median is 2.",
      },
      {
        input: "nums1 = [1,2], nums2 = [3,4]",
        output: "2.50000",
        explanation: "merged array = [1,2,3,4] and median is (2+3)/2 = 2.5.",
      },
    ],
    starterCode: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
function findMedianSortedArrays(nums1, nums2) {
  // Write your solution here

}`,
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    topics: ["String", "Dynamic Programming"],
    acceptance: 33.7,
    solved: true,
    attempted: false,
    isDaily: false,
    description:
      'Given a string `s`, return the longest palindromic substring in `s`.',
    constraints: [
      "1 ≤ s.length ≤ 1000",
      "s consist of only digits and English letters.",
    ],
    examples: [
      {
        input: 's = "babad"',
        output: '"bab"',
        explanation: '"aba" is also a valid answer.',
      },
      {
        input: 's = "cbbd"',
        output: '"bb"',
        explanation: "",
      },
    ],
    starterCode: `/**
 * @param {string} s
 * @return {string}
 */
function longestPalindrome(s) {
  // Write your solution here

}`,
  },
  {
    id: 6,
    title: "Regular Expression Matching",
    difficulty: "Hard",
    topics: ["String", "Dynamic Programming", "Recursion"],
    acceptance: 28.9,
    solved: false,
    attempted: false,
    isDaily: false,
    description:
      'Given an input string `s` and a pattern `p`, implement regular expression matching with support for `.` and `*` where:\n\n- `.` Matches any single character.\n- `*` Matches zero or more of the preceding element.\n\nThe matching should cover the entire input string (not partial).',
    constraints: [
      "1 ≤ s.length ≤ 20",
      "1 ≤ p.length ≤ 20",
      "s contains only lowercase English letters.",
      "p contains only lowercase English letters, '.', and '*'.",
      "It is guaranteed for each appearance of the character '*', there will be a previous valid character to match.",
    ],
    examples: [
      {
        input: 's = "aa", p = "a"',
        output: "false",
        explanation: '"a" does not match the entire string "aa".',
      },
      {
        input: 's = "aa", p = "a*"',
        output: "true",
        explanation: '"*" means zero or more of the preceding element, "a".',
      },
    ],
    starterCode: `/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
function isMatch(s, p) {
  // Write your solution here

}`,
  },
  {
    id: 7,
    title: "Container With Most Water",
    difficulty: "Medium",
    topics: ["Array", "Two Pointers", "Greedy"],
    acceptance: 54.3,
    solved: false,
    attempted: true,
    isDaily: false,
    description:
      "You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the ith line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.\n\nNotice that you may not slant the container.",
    constraints: [
      "n == height.length",
      "2 ≤ n ≤ 10⁵",
      "0 ≤ height[i] ≤ 10⁴",
    ],
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation: "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49.",
      },
      {
        input: "height = [1,1]",
        output: "1",
        explanation: "",
      },
    ],
    starterCode: `/**
 * @param {number[]} height
 * @return {number}
 */
function maxArea(height) {
  // Write your solution here

}`,
  },
  {
    id: 8,
    title: "Integer to Roman",
    difficulty: "Medium",
    topics: ["String", "Math", "Hash Map"],
    acceptance: 63.2,
    solved: true,
    attempted: false,
    isDaily: false,
    description:
      "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.\n\nGiven an integer, convert it to a roman numeral.",
    constraints: [
      "1 ≤ num ≤ 3999",
    ],
    examples: [
      {
        input: "num = 3",
        output: '"III"',
        explanation: "",
      },
      {
        input: "num = 58",
        output: '"LVIII"',
        explanation: "L = 50, V = 5, III = 3.",
      },
    ],
    starterCode: `/**
 * @param {number} num
 * @return {string}
 */
function intToRoman(num) {
  // Write your solution here

}`,
  },
  {
    id: 9,
    title: "Roman to Integer",
    difficulty: "Easy",
    topics: ["String", "Math", "Hash Map"],
    acceptance: 58.6,
    solved: true,
    attempted: false,
    isDaily: false,
    description:
      "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.\n\nGiven a roman numeral, convert it to an integer.",
    constraints: [
      "1 ≤ s.length ≤ 15",
      "1 ≤ s ≤ 3999",
      "s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').",
      "It is guaranteed that s is a valid roman numeral in the range [1, 3999].",
    ],
    examples: [
      {
        input: 's = "III"',
        output: "3",
        explanation: "",
      },
      {
        input: 's = "LVIII"',
        output: "58",
        explanation: "L = 50, V = 5, III = 3.",
      },
    ],
    starterCode: `/**
 * @param {string} s
 * @return {number}
 */
function romanToInt(s) {
  // Write your solution here

}`,
  },
  {
    id: 10,
    title: "3Sum",
    difficulty: "Medium",
    topics: ["Array", "Two Pointers", "Sorting"],
    acceptance: 32.8,
    solved: false,
    attempted: false,
    isDaily: true,
    description:
      "Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nNotice that the solution set must not contain duplicate triplets.",
    constraints: [
      "3 ≤ nums.length ≤ 3000",
      "-10⁵ ≤ nums[i] ≤ 10⁵",
    ],
    examples: [
      {
        input: "nums = [-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]",
        explanation: "The distinct triplets are [-1,0,1] and [-1,-1,2].",
      },
      {
        input: "nums = [0,1,1]",
        output: "[]",
        explanation: "The only possible triplet does not sum up to 0.",
      },
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function threeSum(nums) {
  // Write your solution here

}`,
  },
  {
    id: 11,
    title: "Letter Combinations of a Phone Number",
    difficulty: "Medium",
    topics: ["String", "Backtracking", "Recursion"],
    acceptance: 57.4,
    solved: false,
    attempted: false,
    isDaily: false,
    description:
      "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.\n\nA mapping of digits to letters (just like on the telephone buttons) is given below.",
    constraints: [
      "1 ≤ digits.length ≤ 4",
      "digits[i] is a digit in the range ['2', '9'].",
    ],
    examples: [
      {
        input: 'digits = "23"',
        output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]',
        explanation: "",
      },
      {
        input: 'digits = ""',
        output: "[]",
        explanation: "",
      },
    ],
    starterCode: `/**
 * @param {string} digits
 * @return {string[]}
 */
function letterCombinations(digits) {
  // Write your solution here

}`,
  },
  {
    id: 12,
    title: "Remove Nth Node From End of List",
    difficulty: "Medium",
    topics: ["Linked List", "Two Pointers"],
    acceptance: 42.1,
    solved: false,
    attempted: true,
    isDaily: false,
    description:
      "Given the head of a linked list, remove the nth node from the end of the list and return its head.",
    constraints: [
      "The number of nodes in the list is sz.",
      "1 ≤ sz ≤ 30",
      "0 ≤ Node.val ≤ 100",
      "1 ≤ n ≤ sz",
    ],
    examples: [
      {
        input: "head = [1,2,3,4,5], n = 2",
        output: "[1,2,3,5]",
        explanation: "The 2nd node from the end is 4.",
      },
      {
        input: "head = [1], n = 1",
        output: "[]",
        explanation: "",
      },
    ],
    starterCode: `/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
function removeNthFromEnd(head, n) {
  // Write your solution here

}`,
  },
  {
    id: 13,
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    topics: ["Array", "Binary Search"],
    acceptance: 40.6,
    solved: true,
    attempted: false,
    isDaily: false,
    description:
      "There is an integer array `nums` sorted in ascending order (with distinct values).\n\nPrior to being passed to your function, `nums` is possibly rotated at an unknown pivot index k. Given the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or -1 if it is not in `nums`.\n\nYou must write an algorithm with O(log n) runtime complexity.",
    constraints: [
      "1 ≤ nums.length ≤ 5000",
      "-10⁴ ≤ nums[i] ≤ 10⁴",
      "All values of nums are unique.",
      "nums is an ascending array that is possibly rotated.",
      "-10⁴ ≤ target ≤ 10⁴",
    ],
    examples: [
      {
        input: "nums = [4,5,6,7,0,1,2], target = 0",
        output: "4",
        explanation: "",
      },
      {
        input: "nums = [4,5,6,7,0,1,2], target = 3",
        output: "-1",
        explanation: "",
      },
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
  // Write your solution here

}`,
  },
  {
    id: 14,
    title: "Find First and Last Position of Element in Sorted Array",
    difficulty: "Medium",
    topics: ["Array", "Binary Search"],
    acceptance: 42.9,
    solved: false,
    attempted: false,
    isDaily: false,
    description:
      "Given an array of integers `nums` sorted in non-decreasing order, find the starting and ending position of a given `target` value.\n\nIf `target` is not found in the array, return `[-1, -1]`.\n\nYou must write an algorithm with O(log n) runtime complexity.",
    constraints: [
      "0 ≤ nums.length ≤ 10⁵",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "nums is a non-decreasing array.",
      "-10⁹ ≤ target ≤ 10⁹",
    ],
    examples: [
      {
        input: "nums = [5,7,7,8,8,10], target = 8",
        output: "[3,4]",
        explanation: "",
      },
      {
        input: "nums = [5,7,7,8,8,10], target = 6",
        output: "[-1,-1]",
        explanation: "",
      },
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function searchRange(nums, target) {
  // Write your solution here

}`,
  },
  {
    id: 15,
    title: "Combination Sum",
    difficulty: "Medium",
    topics: ["Array", "Backtracking"],
    acceptance: 67.8,
    solved: true,
    attempted: false,
    isDaily: false,
    description:
      "Given an array of distinct integers `candidates` and a target integer `target`, return a list of all unique combinations of `candidates` where the chosen numbers sum to `target`. You may return the combinations in any order.\n\nThe same number may be chosen from `candidates` an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.\n\nThe test cases are generated such that the number of unique combinations that sum up to `target` is less than 150 combinations for the given input.",
    constraints: [
      "1 ≤ candidates.length <= 30",
      "2 <= candidates[i] <= 40",
      "All elements of candidates are distinct.",
      "1 <= target <= 40",
    ],
    examples: [
      {
        input: "candidates = [2,3,6,7], target = 7",
        output: "[[2,2,3],[7]]",
        explanation: "2 and 3 are candidates, and 2 + 2 + 3 = 7. 7 is a candidate. 7 = 7.",
      },
      {
        input: "candidates = [2,3,5], target = 8",
        output: "[[2,2,2,2],[2,3,3],[3,5]]",
        explanation: "",
      },
    ],
    starterCode: `/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
function combinationSum(candidates, target) {
  // Write your solution here

}`,
  },
  {
    id: 16,
    title: "Trapping Rain Water",
    difficulty: "Hard",
    topics: ["Array", "Two Pointers", "Stack", "Dynamic Programming"],
    acceptance: 59.1,
    solved: false,
    attempted: false,
    isDaily: false,
    description:
      "Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.",
    constraints: [
      "n == height.length",
      "1 ≤ n ≤ 2 × 10⁴",
      "0 ≤ height[i] ≤ 10⁵",
    ],
    examples: [
      {
        input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        output: "6",
        explanation: "The elevation map is represented by the array. In this case, 6 units of rain water are being trapped.",
      },
      {
        input: "height = [4,2,0,3,2,5]",
        output: "9",
        explanation: "",
      },
    ],
    starterCode: `/**
 * @param {number[]} height
 * @return {number}
 */
function trap(height) {
  // Write your solution here

}`,
  },
  {
    id: 17,
    title: "Climbing Stairs",
    difficulty: "Easy",
    topics: ["Dynamic Programming", "Math"],
    acceptance: 51.7,
    solved: true,
    attempted: false,
    isDaily: false,
    description:
      "You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?",
    constraints: [
      "1 ≤ n ≤ 45",
    ],
    examples: [
      {
        input: "n = 2",
        output: "2",
        explanation: "1. 1 step + 1 step\n2. 2 steps",
      },
      {
        input: "n = 3",
        output: "3",
        explanation: "1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step",
      },
    ],
    starterCode: `/**
 * @param {number} n
 * @return {number}
 */
function climbStairs(n) {
  // Write your solution here

}`,
  },
  {
    id: 18,
    title: "Maximum Subarray",
    difficulty: "Medium",
    topics: ["Array", "Dynamic Programming", "Divide and Conquer"],
    acceptance: 50.3,
    solved: false,
    attempted: false,
    isDaily: false,
    description:
      "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.",
    constraints: [
      "1 ≤ nums.length ≤ 10⁵",
      "-10⁴ ≤ nums[i] ≤ 10⁴",
    ],
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
      },
      {
        input: "nums = [1]",
        output: "1",
        explanation: "",
      },
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
  // Write your solution here

}`,
  },
]

export const allTopics = [
  "Array",
  "String",
  "Hash Map",
  "Linked List",
  "Binary Search",
  "Two Pointers",
  "Dynamic Programming",
  "Backtracking",
  "Sliding Window",
  "Stack",
  "Sorting",
  "Greedy",
  "Math",
  "Divide and Conquer",
  "Recursion",
]
