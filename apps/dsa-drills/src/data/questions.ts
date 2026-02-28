import type { ExerciseQuestion } from '@cstools/exercises/types';

export const sampleQuestions: ExerciseQuestion[] = [
  // ============================================================
  // CATEGORY 1: Arrays & Strings (10 questions)
  // ============================================================
  {
    id: 'arrays-1',
    type: 'trace-output',
    question: 'What is the output of this sliding window maximum sum code?',
    codeSnippet: `function maxSum(arr, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += arr[i];
  let max = sum;
  for (let i = k; i < arr.length; i++) {
    sum += arr[i] - arr[i - k];
    max = Math.max(max, sum);
  }
  return max;
}
console.log(maxSum([2, 1, 5, 1, 3, 2], 3));`,
    language: 'javascript',
    answer: '9',
    explanation: 'The sliding window of size 3 computes sums: [2+1+5]=8, [1+5+1]=7, [5+1+3]=9, [1+3+2]=6. The maximum is 9.',
    hints: ['Track the sum as the window slides right by adding the new element and removing the leftmost'],
    difficulty: 'easy',
    tags: ['arrays', 'searching'],
  },
  {
    id: 'arrays-2',
    type: 'multiple-choice',
    question: 'In the two-pointer technique for finding a pair that sums to a target in a sorted array, what do you do when the current sum is less than the target?',
    options: [
      'Move the right pointer left',
      'Move the left pointer right',
      'Move both pointers inward',
      'Reset both pointers',
    ],
    answer: 'Move the left pointer right',
    explanation: 'When the sum is too small, you need a larger value. Since the array is sorted, moving the left pointer right increases the sum.',
    difficulty: 'easy',
    tags: ['arrays', 'searching'],
  },
  {
    id: 'arrays-3',
    type: 'trace-output',
    question: 'What does this two-pointer function return?',
    codeSnippet: `function removeDuplicates(arr) {
  if (arr.length === 0) return 0;
  let i = 0;
  for (let j = 1; j < arr.length; j++) {
    if (arr[j] !== arr[i]) {
      i++;
      arr[i] = arr[j];
    }
  }
  return i + 1;
}
console.log(removeDuplicates([1, 1, 2, 3, 3, 4]));`,
    language: 'javascript',
    answer: '4',
    explanation: 'The function removes duplicates in-place using two pointers. Unique elements are [1,2,3,4], so it returns 4 (the count of unique elements).',
    hints: ['Pointer i tracks the position of the last unique element'],
    difficulty: 'easy',
    tags: ['arrays', 'data-structures'],
  },
  {
    id: 'arrays-4',
    type: 'complexity-match',
    question: 'What is the time complexity of the sliding window technique for finding the maximum sum subarray of size k?',
    options: ['O(k)', 'O(n)', 'O(n * k)', 'O(n log n)'],
    answer: 'O(n)',
    explanation: 'The sliding window scans through the array once, adding and removing one element at each step, making it O(n) regardless of window size k.',
    difficulty: 'easy',
    tags: ['arrays', 'complexity'],
  },
  {
    id: 'arrays-5',
    type: 'code-fix',
    question: 'This function should reverse a string in-place, but it has a bug. What is wrong?',
    codeSnippet: `function reverseString(s) {
  let left = 0, right = s.length;
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
  return s;
}`,
    language: 'javascript',
    answer: 'right should be initialized to s.length - 1',
    explanation: 'right is initialized to s.length, which is out of bounds. It should be s.length - 1 to point to the last valid index.',
    hints: ['Check the initial value of the right pointer'],
    difficulty: 'easy',
    tags: ['arrays', 'strings'],
  },
  {
    id: 'arrays-6',
    type: 'trace-output',
    question: 'What is the output of this Kadane\'s algorithm implementation?',
    codeSnippet: `function maxSubarraySum(arr) {
  let maxSoFar = arr[0];
  let maxEndingHere = arr[0];
  for (let i = 1; i < arr.length; i++) {
    maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }
  return maxSoFar;
}
console.log(maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4]));`,
    language: 'javascript',
    answer: '6',
    explanation: 'Kadane\'s algorithm finds the maximum contiguous subarray sum. The subarray [4, -1, 2, 1] has sum 6, which is the maximum.',
    hints: ['At each position, decide whether to extend the current subarray or start fresh'],
    difficulty: 'medium',
    tags: ['arrays', 'dynamic-programming'],
  },
  {
    id: 'arrays-7',
    type: 'multiple-choice',
    question: 'Which technique is most efficient for finding the longest substring without repeating characters?',
    options: [
      'Brute force checking all substrings - O(n^3)',
      'Sliding window with a hash set - O(n)',
      'Dynamic programming - O(n^2)',
      'Divide and conquer - O(n log n)',
    ],
    answer: 'Sliding window with a hash set - O(n)',
    explanation: 'A sliding window with a hash set can track characters in the current window, expanding right and shrinking left when a duplicate is found, achieving O(n) time.',
    difficulty: 'medium',
    tags: ['arrays', 'strings', 'hash-tables'],
  },
  {
    id: 'arrays-8',
    type: 'trace-output',
    question: 'What is the output of this array rotation code?',
    codeSnippet: `function rotate(arr, k) {
  k = k % arr.length;
  const reverse = (a, l, r) => {
    while (l < r) { [a[l], a[r]] = [a[r], a[l]]; l++; r--; }
  };
  reverse(arr, 0, arr.length - 1);
  reverse(arr, 0, k - 1);
  reverse(arr, k, arr.length - 1);
  return arr;
}
console.log(rotate([1,2,3,4,5,6,7], 3).join(','));`,
    language: 'javascript',
    answer: '5,6,7,1,2,3,4',
    explanation: 'Rotating right by 3: reverse all -> [7,6,5,4,3,2,1], reverse first 3 -> [5,6,7,4,3,2,1], reverse rest -> [5,6,7,1,2,3,4].',
    hints: ['The three-reverse technique: reverse all, reverse first k, reverse the rest'],
    difficulty: 'medium',
    tags: ['arrays', 'data-structures'],
  },
  {
    id: 'arrays-9',
    type: 'code-fix',
    question: 'This function to find the minimum window substring has a bug. What needs to be fixed?',
    codeSnippet: `function minWindow(s, t) {
  const need = {};
  for (const c of t) need[c] = (need[c] || 0) + 1;
  let have = 0, total = Object.keys(need).length;
  let left = 0, minLen = Infinity, result = "";
  const window = {};
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    window[c] = (window[c] || 0) + 1;
    if (need[c] && window[c] === need[c]) have++;
    while (have === total) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        result = s.slice(left, right + 1);
      }
      window[s[left]]--;
      if (need[s[left]] && window[s[left]] < need[s[left]]) have++;
      left++;
    }
  }
  return result;
}`,
    language: 'javascript',
    answer: 'have++ should be have-- when shrinking the window',
    explanation: 'When shrinking the window from the left and a required character count drops below what is needed, we should decrement have (have--), not increment it.',
    hints: ['Look at what happens when we remove a character from the left side of the window'],
    difficulty: 'hard',
    tags: ['arrays', 'strings'],
  },
  {
    id: 'arrays-10',
    type: 'complexity-match',
    question: 'What is the time complexity of finding all anagram positions in a string of length n with a pattern of length m?',
    options: ['O(n * m)', 'O(n)', 'O(n log m)', 'O(n * m!)'],
    answer: 'O(n)',
    explanation: 'Using a sliding window of size m with a character frequency map, you can check for anagrams in O(n) time by maintaining the frequency count as the window slides.',
    difficulty: 'hard',
    tags: ['arrays', 'strings', 'complexity'],
  },

  // ============================================================
  // CATEGORY 2: Linked Lists (9 questions)
  // ============================================================
  {
    id: 'linked-lists-1',
    type: 'multiple-choice',
    question: 'What is the time complexity of inserting a node at the head of a singly linked list?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
    answer: 'O(1)',
    explanation: 'Inserting at the head only requires creating a new node and pointing it to the current head, then updating the head pointer. No traversal needed.',
    difficulty: 'easy',
    tags: ['linked-lists', 'complexity'],
  },
  {
    id: 'linked-lists-2',
    type: 'trace-output',
    question: 'What does this linked list reversal return? (Output is the values in order)',
    codeSnippet: `class ListNode {
  constructor(val, next = null) {
    this.val = val; this.next = next;
  }
}
function reverse(head) {
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}
// List: 1 -> 2 -> 3 -> 4
let head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))));
head = reverse(head);
const vals = [];
let n = head;
while (n) { vals.push(n.val); n = n.next; }
console.log(vals.join('->'));`,
    language: 'javascript',
    answer: '4->3->2->1',
    explanation: 'The iterative reversal reassigns each node\'s next pointer to point to the previous node, effectively reversing the entire list.',
    hints: ['Track three pointers: prev, curr, and next'],
    difficulty: 'easy',
    tags: ['linked-lists', 'data-structures'],
  },
  {
    id: 'linked-lists-3',
    type: 'multiple-choice',
    question: 'Floyd\'s cycle detection algorithm uses which approach?',
    options: [
      'Hash set to track visited nodes',
      'Two pointers moving at different speeds',
      'Reversing the list and comparing',
      'Counting nodes and checking for repeats',
    ],
    answer: 'Two pointers moving at different speeds',
    explanation: 'Floyd\'s algorithm uses a slow pointer (1 step) and a fast pointer (2 steps). If there is a cycle, the fast pointer will eventually meet the slow pointer.',
    difficulty: 'medium',
    tags: ['linked-lists', 'searching'],
  },
  {
    id: 'linked-lists-4',
    type: 'code-fix',
    question: 'This function to detect a cycle in a linked list has a bug. What needs to be fixed?',
    codeSnippet: `function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next;
    if (slow === fast) return true;
  }
  return false;
}`,
    language: 'javascript',
    answer: 'fast should move two steps: fast = fast.next.next',
    explanation: 'The fast pointer must move two steps at a time (fast = fast.next.next) for Floyd\'s algorithm to work. Currently it only moves one step, same as slow, so they would never meet.',
    hints: ['How many steps should the fast pointer take in each iteration?'],
    difficulty: 'medium',
    tags: ['linked-lists', 'searching'],
  },
  {
    id: 'linked-lists-5',
    type: 'trace-output',
    question: 'What value does this function return for two sorted linked lists?',
    codeSnippet: `function mergeTwoLists(l1, l2) {
  const dummy = { val: 0, next: null };
  let curr = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      curr.next = l1; l1 = l1.next;
    } else {
      curr.next = l2; l2 = l2.next;
    }
    curr = curr.next;
  }
  curr.next = l1 || l2;
  return dummy.next;
}
// l1: 1->3->5, l2: 2->4->6
// What is the merged list?
// Output: values joined by ->`,
    language: 'javascript',
    answer: '1->2->3->4->5->6',
    explanation: 'The merge function compares heads of both lists, appending the smaller value each time, producing a fully sorted merged list.',
    hints: ['This works like the merge step in merge sort'],
    difficulty: 'medium',
    tags: ['linked-lists', 'sorting'],
  },
  {
    id: 'linked-lists-6',
    type: 'complexity-match',
    question: 'What is the time complexity of finding the middle node of a singly linked list using the fast/slow pointer technique?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
    answer: 'O(n)',
    explanation: 'The fast pointer traverses the entire list while the slow pointer reaches the middle. The total work is proportional to n, giving O(n).',
    difficulty: 'easy',
    tags: ['linked-lists', 'complexity'],
  },
  {
    id: 'linked-lists-7',
    type: 'multiple-choice',
    question: 'To find the start of a cycle in a linked list using Floyd\'s algorithm, after the slow and fast pointers meet, what do you do next?',
    options: [
      'Return the meeting point as the cycle start',
      'Move one pointer to head and advance both by 1 until they meet',
      'Count the cycle length and use that to find the start',
      'Reverse the list from the meeting point',
    ],
    answer: 'Move one pointer to head and advance both by 1 until they meet',
    explanation: 'After detecting the cycle, reset one pointer to head and advance both pointers one step at a time. They will meet at the start of the cycle.',
    difficulty: 'hard',
    tags: ['linked-lists', 'searching'],
  },
  {
    id: 'linked-lists-8',
    type: 'code-fix',
    question: 'This function to remove the nth node from the end of a linked list has a bug. What is wrong?',
    codeSnippet: `function removeNthFromEnd(head, n) {
  const dummy = { val: 0, next: head };
  let fast = dummy, slow = dummy;
  for (let i = 0; i < n; i++) fast = fast.next;
  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return dummy.next;
}`,
    language: 'javascript',
    answer: 'fast should advance n+1 times, or the while condition should be fast.next !== null',
    explanation: 'The fast pointer needs to be n+1 ahead of slow so that when fast reaches null, slow is at the node BEFORE the one to remove. Either advance fast one more step initially, or change the while condition to while (fast.next).',
    hints: ['When fast is null, where is slow relative to the node to remove?'],
    difficulty: 'hard',
    tags: ['linked-lists', 'data-structures'],
  },
  {
    id: 'linked-lists-9',
    type: 'multiple-choice',
    question: 'What advantage does a doubly linked list have over a singly linked list?',
    options: [
      'Uses less memory per node',
      'O(1) deletion when given a reference to the node',
      'Faster traversal from head to tail',
      'Better cache locality',
    ],
    answer: 'O(1) deletion when given a reference to the node',
    explanation: 'With a doubly linked list, you can access both the previous and next nodes directly, enabling O(1) deletion without needing to traverse from the head to find the predecessor.',
    difficulty: 'medium',
    tags: ['linked-lists', 'data-structures'],
  },

  // ============================================================
  // CATEGORY 3: Stacks & Queues (9 questions)
  // ============================================================
  {
    id: 'stacks-1',
    type: 'trace-output',
    question: 'What does this balanced brackets checker return for the input "({[]})"?',
    codeSnippet: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', ']': '[', '}': '{' };
  for (const c of s) {
    if ('({['.includes(c)) {
      stack.push(c);
    } else {
      if (stack.pop() !== map[c]) return false;
    }
  }
  return stack.length === 0;
}
console.log(isValid("({[]})"));`,
    language: 'javascript',
    answer: 'true',
    explanation: 'The stack processes: push (, push {, push [, pop [ matches [, pop { matches {, pop ( matches (. Stack is empty at end, so returns true.',
    hints: ['Track what gets pushed and popped at each character'],
    difficulty: 'easy',
    tags: ['stacks', 'strings'],
  },
  {
    id: 'stacks-2',
    type: 'multiple-choice',
    question: 'Which data structure is LIFO (Last In, First Out)?',
    options: ['Queue', 'Stack', 'Deque', 'Priority Queue'],
    answer: 'Stack',
    explanation: 'A stack follows LIFO ordering -- the last element pushed is the first one popped. Queues use FIFO, deques allow both ends, and priority queues order by priority.',
    difficulty: 'easy',
    tags: ['stacks', 'data-structures'],
  },
  {
    id: 'stacks-3',
    type: 'trace-output',
    question: 'What is the output of this next greater element function?',
    codeSnippet: `function nextGreaterElements(arr) {
  const result = new Array(arr.length).fill(-1);
  const stack = [];
  for (let i = 0; i < arr.length; i++) {
    while (stack.length && arr[i] > arr[stack[stack.length - 1]]) {
      result[stack.pop()] = arr[i];
    }
    stack.push(i);
  }
  return result;
}
console.log(nextGreaterElements([4, 5, 2, 10, 8]).join(','));`,
    language: 'javascript',
    answer: '5,10,10,-1,-1',
    explanation: 'For each element, the next greater element is: 4->5, 5->10, 2->10, 10->none(-1), 8->none(-1). The monotonic stack efficiently finds these.',
    hints: ['The stack stores indices of elements waiting for their next greater element'],
    difficulty: 'medium',
    tags: ['stacks', 'arrays'],
  },
  {
    id: 'stacks-4',
    type: 'code-fix',
    question: 'This queue implementation using two stacks has a bug. What needs to be fixed?',
    codeSnippet: `class QueueWithStacks {
  constructor() {
    this.inStack = [];
    this.outStack = [];
  }
  enqueue(val) {
    this.inStack.push(val);
  }
  dequeue() {
    if (this.outStack.length === 0) {
      while (this.inStack.length) {
        this.outStack.push(this.inStack.pop());
      }
    }
    return this.inStack.pop();
  }
}`,
    language: 'javascript',
    answer: 'dequeue should return this.outStack.pop(), not this.inStack.pop()',
    explanation: 'After transferring elements from inStack to outStack, the elements are in correct FIFO order in outStack. The dequeue should pop from outStack.',
    hints: ['After the transfer, which stack has the elements in the correct order?'],
    difficulty: 'medium',
    tags: ['stacks', 'queues', 'data-structures'],
  },
  {
    id: 'stacks-5',
    type: 'multiple-choice',
    question: 'What is a monotonic stack useful for?',
    options: [
      'Sorting elements in O(n) time',
      'Finding the next greater/smaller element for each position',
      'Implementing BFS on a graph',
      'Maintaining a balanced BST',
    ],
    answer: 'Finding the next greater/smaller element for each position',
    explanation: 'A monotonic stack maintains elements in increasing or decreasing order, making it efficient for finding the next greater or smaller element in O(n) time.',
    difficulty: 'medium',
    tags: ['stacks', 'data-structures'],
  },
  {
    id: 'stacks-6',
    type: 'trace-output',
    question: 'What does this min-stack return when getMin() is called?',
    codeSnippet: `class MinStack {
  constructor() { this.stack = []; this.minStack = []; }
  push(val) {
    this.stack.push(val);
    const min = this.minStack.length === 0
      ? val : Math.min(val, this.minStack[this.minStack.length - 1]);
    this.minStack.push(min);
  }
  pop() { this.stack.pop(); this.minStack.pop(); }
  getMin() { return this.minStack[this.minStack.length - 1]; }
}
const s = new MinStack();
s.push(5); s.push(3); s.push(7); s.push(1);
s.pop(); s.pop();
console.log(s.getMin());`,
    language: 'javascript',
    answer: '3',
    explanation: 'After push(5,3,7,1): minStack is [5,3,3,1]. After two pops: minStack is [5,3]. getMin() returns 3.',
    hints: ['Track the minStack state after each operation'],
    difficulty: 'medium',
    tags: ['stacks', 'data-structures'],
  },
  {
    id: 'stacks-7',
    type: 'complexity-match',
    question: 'What is the amortized time complexity of the dequeue operation in a queue implemented with two stacks?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
    answer: 'O(1)',
    explanation: 'Although a single dequeue can take O(n) when transferring elements, each element is moved at most once from inStack to outStack, making the amortized cost O(1) per operation.',
    difficulty: 'hard',
    tags: ['stacks', 'queues', 'complexity'],
  },
  {
    id: 'stacks-8',
    type: 'trace-output',
    question: 'What does this postfix expression evaluator return?',
    codeSnippet: `function evalPostfix(tokens) {
  const stack = [];
  for (const t of tokens) {
    if ('+-*/'.includes(t)) {
      const b = stack.pop(), a = stack.pop();
      if (t === '+') stack.push(a + b);
      else if (t === '-') stack.push(a - b);
      else if (t === '*') stack.push(a * b);
      else stack.push(Math.trunc(a / b));
    } else {
      stack.push(Number(t));
    }
  }
  return stack[0];
}
console.log(evalPostfix(['2', '3', '+', '4', '*']));`,
    language: 'javascript',
    answer: '20',
    explanation: 'Postfix evaluation: push 2, push 3, pop 3 and 2 then push 2+3=5, push 4, pop 4 and 5 then push 5*4=20. Result is 20.',
    hints: ['Operators pop two values and push the result'],
    difficulty: 'medium',
    tags: ['stacks', 'data-structures'],
  },
  {
    id: 'stacks-9',
    type: 'multiple-choice',
    question: 'What is the best data structure for implementing a BFS traversal?',
    options: ['Stack', 'Queue', 'Priority Queue', 'Linked List'],
    answer: 'Queue',
    explanation: 'BFS explores nodes level by level. A queue (FIFO) ensures that nodes are visited in the order they were discovered, maintaining the breadth-first property.',
    difficulty: 'easy',
    tags: ['queues', 'graphs', 'data-structures'],
  },

  // ============================================================
  // CATEGORY 4: Trees & BST (10 questions)
  // ============================================================
  {
    id: 'trees-1',
    type: 'multiple-choice',
    question: 'Which traversal of a BST visits nodes in ascending sorted order?',
    options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'],
    answer: 'In-order',
    explanation: 'In-order traversal (left, root, right) of a BST visits nodes in ascending sorted order because all left subtree values are smaller and all right subtree values are larger.',
    difficulty: 'easy',
    tags: ['trees', 'data-structures'],
  },
  {
    id: 'trees-2',
    type: 'trace-output',
    question: 'What is the output of this pre-order traversal?',
    codeSnippet: `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}
function preorder(node) {
  if (!node) return [];
  return [node.val, ...preorder(node.left), ...preorder(node.right)];
}
//     1
//    / \\
//   2   3
//  / \\
// 4   5
const tree = new TreeNode(1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3)
);
console.log(preorder(tree).join(','));`,
    language: 'javascript',
    answer: '1,2,4,5,3',
    explanation: 'Pre-order visits root first, then left subtree, then right subtree: 1, then 2->4->5, then 3.',
    hints: ['Pre-order: root, left, right'],
    difficulty: 'easy',
    tags: ['trees', 'recursion'],
  },
  {
    id: 'trees-3',
    type: 'trace-output',
    question: 'What does this tree height function return for a tree with 4 levels?',
    codeSnippet: `function height(node) {
  if (!node) return 0;
  return 1 + Math.max(height(node.left), height(node.right));
}
//       10
//      /  \\
//     5   15
//    /
//   2
//  /
// 1
const tree = { val: 10,
  left: { val: 5,
    left: { val: 2,
      left: { val: 1, left: null, right: null },
      right: null },
    right: null },
  right: { val: 15, left: null, right: null }
};
console.log(height(tree));`,
    language: 'javascript',
    answer: '4',
    explanation: 'The longest path is 10->5->2->1, which has 4 nodes, so the height is 4.',
    hints: ['Height is 1 + max(left height, right height)'],
    difficulty: 'easy',
    tags: ['trees', 'recursion'],
  },
  {
    id: 'trees-4',
    type: 'code-fix',
    question: 'This BST validation function has a bug. What needs to be fixed?',
    codeSnippet: `function isValidBST(node, min = -Infinity, max = Infinity) {
  if (!node) return true;
  if (node.val < min || node.val > max) return false;
  return isValidBST(node.left, min, node.val) &&
         isValidBST(node.right, node.val, max);
}`,
    language: 'javascript',
    answer: 'The comparisons should be <= and >= (or use strict < and > bounds): node.val <= min || node.val >= max',
    explanation: 'A valid BST requires strict inequality -- no duplicates and left < root < right. The condition should reject equal values at the boundaries: node.val <= min || node.val >= max.',
    hints: ['What happens if a node value equals the min or max bound?'],
    difficulty: 'medium',
    tags: ['trees', 'data-structures'],
  },
  {
    id: 'trees-5',
    type: 'multiple-choice',
    question: 'What is the Lowest Common Ancestor (LCA) of nodes 4 and 5 in a BST where the root is 6 with left child 2 (children 0,4) and right child 8?',
    options: ['2', '4', '6', '0'],
    answer: '2',
    explanation: 'In the BST, node 4 is in the right subtree of 2, and node 5 would be searched from 2\'s right subtree. Both 4 and 5 descend from node 2, making 2 the LCA.',
    difficulty: 'medium',
    tags: ['trees', 'data-structures'],
  },
  {
    id: 'trees-6',
    type: 'trace-output',
    question: 'What is the output of this level-order (BFS) traversal?',
    codeSnippet: `function levelOrder(root) {
  if (!root) return [];
  const result = [], queue = [root];
  while (queue.length) {
    const level = [];
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}
//     3
//    / \\
//   9  20
//     /  \\
//    15   7
const tree = { val: 3,
  left: { val: 9, left: null, right: null },
  right: { val: 20,
    left: { val: 15, left: null, right: null },
    right: { val: 7, left: null, right: null } }
};
console.log(JSON.stringify(levelOrder(tree)));`,
    language: 'javascript',
    answer: '[[3],[9,20],[15,7]]',
    explanation: 'Level-order traversal visits nodes level by level: level 0 has [3], level 1 has [9,20], level 2 has [15,7].',
    hints: ['Use a queue to process each level before moving to the next'],
    difficulty: 'medium',
    tags: ['trees', 'queues'],
  },
  {
    id: 'trees-7',
    type: 'complexity-match',
    question: 'What is the time complexity of searching for a value in a balanced BST with n nodes?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    answer: 'O(log n)',
    explanation: 'In a balanced BST, each comparison eliminates half the remaining nodes, similar to binary search, giving O(log n) search time.',
    difficulty: 'easy',
    tags: ['trees', 'complexity'],
  },
  {
    id: 'trees-8',
    type: 'multiple-choice',
    question: 'Which property distinguishes a BST from a regular binary tree?',
    options: [
      'Every node has exactly two children',
      'Left child < parent < right child for all nodes',
      'The tree is always balanced',
      'The tree has at most log(n) levels',
    ],
    answer: 'Left child < parent < right child for all nodes',
    explanation: 'A BST requires that for every node, all values in the left subtree are smaller and all values in the right subtree are larger. It need not be balanced or complete.',
    difficulty: 'easy',
    tags: ['trees', 'data-structures'],
  },
  {
    id: 'trees-9',
    type: 'code-fix',
    question: 'This function to check if a binary tree is balanced has a bug. What is wrong?',
    codeSnippet: `function isBalanced(root) {
  function height(node) {
    if (!node) return 0;
    const left = height(node.left);
    const right = height(node.right);
    if (Math.abs(left - right) > 1) return -1;
    if (left === -1 || right === -1) return -1;
    return 1 + Math.max(left, right);
  }
  return height(root) !== -1;
}`,
    language: 'javascript',
    answer: 'The check for left === -1 || right === -1 must come BEFORE the abs(left - right) check',
    explanation: 'If a subtree already returned -1 (unbalanced), we should propagate that immediately. Checking abs(left - right) first could use -1 as a valid height and give wrong results.',
    hints: ['What happens if left is -1 and right is 0? What does abs(-1 - 0) return?'],
    difficulty: 'hard',
    tags: ['trees', 'recursion'],
  },
  {
    id: 'trees-10',
    type: 'multiple-choice',
    question: 'What is the space complexity of a recursive DFS traversal of a binary tree?',
    options: ['O(1)', 'O(log n) for balanced, O(n) for skewed', 'O(n) always', 'O(n^2)'],
    answer: 'O(log n) for balanced, O(n) for skewed',
    explanation: 'The recursion stack depth equals the tree height: O(log n) for a balanced tree, O(n) for a completely skewed tree (essentially a linked list).',
    difficulty: 'medium',
    tags: ['trees', 'complexity', 'recursion'],
  },

  // ============================================================
  // CATEGORY 5: Heaps & Priority Queues (8 questions)
  // ============================================================
  {
    id: 'heaps-1',
    type: 'multiple-choice',
    question: 'In a min-heap, where is the smallest element located?',
    options: ['At any leaf node', 'At the root', 'At the last position', 'It could be anywhere'],
    answer: 'At the root',
    explanation: 'In a min-heap, every parent is smaller than its children, so the smallest element is always at the root (index 0 in an array representation).',
    difficulty: 'easy',
    tags: ['heaps', 'data-structures'],
  },
  {
    id: 'heaps-2',
    type: 'trace-output',
    question: 'After inserting [5, 3, 8, 1, 2] into a min-heap one by one, what is the root element?',
    codeSnippet: `class MinHeap {
  constructor() { this.heap = []; }
  insert(val) {
    this.heap.push(val);
    let i = this.heap.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.heap[parent] <= this.heap[i]) break;
      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      i = parent;
    }
  }
  peek() { return this.heap[0]; }
}
const h = new MinHeap();
[5, 3, 8, 1, 2].forEach(v => h.insert(v));
console.log(h.peek());`,
    language: 'javascript',
    answer: '1',
    explanation: 'After inserting all elements, the min-heap property ensures the smallest element (1) bubbles up to the root.',
    hints: ['Each insert places the element at the end and bubbles it up'],
    difficulty: 'easy',
    tags: ['heaps', 'data-structures'],
  },
  {
    id: 'heaps-3',
    type: 'complexity-match',
    question: 'What is the time complexity of extracting the minimum element from a min-heap of n elements?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    answer: 'O(log n)',
    explanation: 'Extracting the min removes the root, replaces it with the last element, then sifts down to restore the heap property. Sifting down takes O(log n) in the worst case.',
    difficulty: 'easy',
    tags: ['heaps', 'complexity'],
  },
  {
    id: 'heaps-4',
    type: 'multiple-choice',
    question: 'To find the kth largest element in an unsorted array efficiently, which approach is best?',
    options: [
      'Sort the array and return arr[n-k] - O(n log n)',
      'Use a min-heap of size k - O(n log k)',
      'Use a max-heap and extract k times - O(n + k log n)',
      'Both B and C are optimal depending on k vs n',
    ],
    answer: 'Both B and C are optimal depending on k vs n',
    explanation: 'A min-heap of size k works well when k is small. A max-heap with k extractions works when k is small relative to n. Both achieve better than O(n log n) for small k.',
    difficulty: 'medium',
    tags: ['heaps', 'complexity'],
  },
  {
    id: 'heaps-5',
    type: 'trace-output',
    question: 'What does this kth smallest element function return?',
    codeSnippet: `function kthSmallest(arr, k) {
  // Using a max-heap of size k (simulated with sorted array)
  const heap = [];
  for (const num of arr) {
    heap.push(num);
    heap.sort((a, b) => b - a); // max-heap order
    if (heap.length > k) heap.pop();
  }
  return heap[0];
}
console.log(kthSmallest([7, 10, 4, 3, 20, 15], 3));`,
    language: 'javascript',
    answer: '7',
    explanation: 'The function maintains the k=3 smallest elements seen so far. After processing all elements, the heap contains [10, 7, 4, 3] -> trimmed to [7, 4, 3]. The root (max of the k smallest) is 7, which is the 3rd smallest.',
    hints: ['A max-heap of size k keeps the k smallest elements, with the kth smallest at the top'],
    difficulty: 'medium',
    tags: ['heaps', 'sorting'],
  },
  {
    id: 'heaps-6',
    type: 'multiple-choice',
    question: 'What is the time complexity of building a heap from an unsorted array of n elements using the heapify approach?',
    options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
    answer: 'O(n)',
    explanation: 'Building a heap using bottom-up heapify (sift-down from the last non-leaf to the root) takes O(n) time, not O(n log n). Most nodes are near the leaves and require minimal sifting.',
    difficulty: 'medium',
    tags: ['heaps', 'complexity'],
  },
  {
    id: 'heaps-7',
    type: 'code-fix',
    question: 'This heap sift-down function has a bug. What needs to be fixed?',
    codeSnippet: `function siftDown(heap, i, n) {
  let smallest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  if (left < n && heap[left] < heap[smallest]) smallest = left;
  if (right < n && heap[right] < heap[smallest]) smallest = right;
  if (smallest !== i) {
    [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
    // Missing recursive call
  }
}`,
    language: 'javascript',
    answer: 'Add siftDown(heap, smallest, n) after the swap',
    explanation: 'After swapping, the element that moved down might still violate the heap property. We need to recursively sift down from the new position: siftDown(heap, smallest, n).',
    hints: ['What happens to the subtree after the swap?'],
    difficulty: 'medium',
    tags: ['heaps', 'recursion'],
  },
  {
    id: 'heaps-8',
    type: 'complexity-match',
    question: 'What is the time complexity of merging k sorted lists of total n elements using a min-heap?',
    options: ['O(n)', 'O(n log k)', 'O(n * k)', 'O(n log n)'],
    answer: 'O(n log k)',
    explanation: 'We maintain a min-heap of size k (one element from each list). For each of the n total elements, we extract-min and insert, each costing O(log k). Total: O(n log k).',
    difficulty: 'hard',
    tags: ['heaps', 'complexity', 'sorting'],
  },

  // ============================================================
  // CATEGORY 6: Graphs (9 questions)
  // ============================================================
  {
    id: 'graphs-1',
    type: 'trace-output',
    question: 'What is the BFS traversal order starting from node 0?',
    codeSnippet: `function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}
// Graph adjacency list
const graph = {
  0: [1, 2],
  1: [0, 3],
  2: [0, 3, 4],
  3: [1, 2],
  4: [2]
};
console.log(bfs(graph, 0).join(','));`,
    language: 'javascript',
    answer: '0,1,2,3,4',
    explanation: 'BFS from 0: visit 0, enqueue neighbors [1,2]. Dequeue 1, enqueue [3]. Dequeue 2, enqueue [4] (3 already visited). Dequeue 3, dequeue 4. Order: 0,1,2,3,4.',
    hints: ['BFS visits nodes level by level using a queue'],
    difficulty: 'easy',
    tags: ['graphs', 'searching'],
  },
  {
    id: 'graphs-2',
    type: 'trace-output',
    question: 'What is the DFS traversal order starting from node A?',
    codeSnippet: `function dfs(graph, start) {
  const visited = new Set();
  const order = [];
  function visit(node) {
    visited.add(node);
    order.push(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) visit(neighbor);
    }
  }
  visit(start);
  return order;
}
const graph = {
  'A': ['B', 'C'],
  'B': ['D', 'E'],
  'C': ['F'],
  'D': [],
  'E': [],
  'F': []
};
console.log(dfs(graph, 'A').join(','));`,
    language: 'javascript',
    answer: 'A,B,D,E,C,F',
    explanation: 'DFS from A: visit A, recurse to B, recurse to D (dead end), back to B, recurse to E (dead end), back to A, recurse to C, recurse to F.',
    hints: ['DFS goes as deep as possible before backtracking'],
    difficulty: 'easy',
    tags: ['graphs', 'recursion'],
  },
  {
    id: 'graphs-3',
    type: 'multiple-choice',
    question: 'What algorithm does Dijkstra\'s shortest path use?',
    options: ['Dynamic Programming', 'Greedy', 'Divide and Conquer', 'Backtracking'],
    answer: 'Greedy',
    explanation: 'Dijkstra\'s algorithm uses a greedy approach, always selecting the unvisited vertex with the smallest tentative distance. It works correctly for graphs with non-negative edge weights.',
    difficulty: 'medium',
    tags: ['graphs', 'searching'],
  },
  {
    id: 'graphs-4',
    type: 'trace-output',
    question: 'What is the topological sort order of this DAG?',
    codeSnippet: `function topologicalSort(graph, numNodes) {
  const inDegree = new Array(numNodes).fill(0);
  for (let u = 0; u < numNodes; u++)
    for (const v of graph[u]) inDegree[v]++;
  const queue = [];
  for (let i = 0; i < numNodes; i++)
    if (inDegree[i] === 0) queue.push(i);
  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of graph[node]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }
  return order;
}
// 0->1, 0->2, 1->3, 2->3
const graph = [[1,2],[3],[3],[]];
console.log(topologicalSort(graph, 4).join(','));`,
    language: 'javascript',
    answer: '0,1,2,3',
    explanation: 'Node 0 has in-degree 0, so it goes first. After removing 0, nodes 1 and 2 have in-degree 0. After removing 1 and 2, node 3 has in-degree 0.',
    hints: ['Start with nodes that have no incoming edges (in-degree 0)'],
    difficulty: 'medium',
    tags: ['graphs', 'sorting'],
  },
  {
    id: 'graphs-5',
    type: 'code-fix',
    question: 'This DFS cycle detection for a directed graph has a bug. What needs to be fixed?',
    codeSnippet: `function hasCycle(graph, numNodes) {
  const visited = new Set();
  function dfs(node) {
    if (visited.has(node)) return true;
    visited.add(node);
    for (const neighbor of graph[node]) {
      if (dfs(neighbor)) return true;
    }
    return false;
  }
  for (let i = 0; i < numNodes; i++) {
    if (!visited.has(i) && dfs(i)) return true;
  }
  return false;
}`,
    language: 'javascript',
    answer: 'Need a separate recursion stack set; visited alone causes false positives',
    explanation: 'Using only a visited set cannot distinguish between a back edge (cycle) and a cross edge (already fully processed node). You need a separate "recursion stack" set, adding nodes when entering and removing when backtracking.',
    hints: ['Consider a graph A->B, A->C, C->B. Is there a cycle? What does this code report?'],
    difficulty: 'hard',
    tags: ['graphs', 'recursion'],
  },
  {
    id: 'graphs-6',
    type: 'complexity-match',
    question: 'What is the time complexity of BFS on a graph with V vertices and E edges (adjacency list)?',
    options: ['O(V)', 'O(E)', 'O(V + E)', 'O(V * E)'],
    answer: 'O(V + E)',
    explanation: 'BFS visits each vertex once (O(V)) and explores each edge once (O(E)), giving O(V + E) total time with an adjacency list representation.',
    difficulty: 'medium',
    tags: ['graphs', 'complexity'],
  },
  {
    id: 'graphs-7',
    type: 'multiple-choice',
    question: 'Which algorithm finds shortest paths from a single source in a graph with negative edge weights (but no negative cycles)?',
    options: ['Dijkstra\'s algorithm', 'Bellman-Ford algorithm', 'Floyd-Warshall algorithm', 'Prim\'s algorithm'],
    answer: 'Bellman-Ford algorithm',
    explanation: 'Bellman-Ford handles negative edge weights by relaxing all edges V-1 times. Dijkstra\'s fails with negative weights. Floyd-Warshall is for all-pairs. Prim\'s is for MST.',
    difficulty: 'medium',
    tags: ['graphs', 'searching'],
  },
  {
    id: 'graphs-8',
    type: 'multiple-choice',
    question: 'What is the key difference between an adjacency matrix and an adjacency list?',
    options: [
      'Adjacency matrix uses O(V) space, adjacency list uses O(V^2)',
      'Adjacency matrix uses O(V^2) space, adjacency list uses O(V + E)',
      'Adjacency list is faster for all operations',
      'Adjacency matrix only works for directed graphs',
    ],
    answer: 'Adjacency matrix uses O(V^2) space, adjacency list uses O(V + E)',
    explanation: 'An adjacency matrix always uses V*V space regardless of edges. An adjacency list uses space proportional to V+E, which is much less for sparse graphs.',
    difficulty: 'easy',
    tags: ['graphs', 'complexity'],
  },
  {
    id: 'graphs-9',
    type: 'code-fix',
    question: 'This Dijkstra implementation has a bug. What needs to be fixed?',
    codeSnippet: `function dijkstra(graph, start, n) {
  const dist = new Array(n).fill(Infinity);
  dist[start] = 0;
  const visited = new Set();
  const pq = [[0, start]]; // [distance, node]
  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, u] = pq.shift();
    if (visited.has(u)) continue;
    visited.add(u);
    for (const [v, w] of graph[u]) {
      const newDist = d + w;
      if (newDist > dist[v]) {
        dist[v] = newDist;
        pq.push([newDist, v]);
      }
    }
  }
  return dist;
}`,
    language: 'javascript',
    answer: 'The relaxation condition should be newDist < dist[v], not newDist > dist[v]',
    explanation: 'Dijkstra\'s algorithm updates a distance only when a shorter path is found. The condition should be newDist < dist[v] to keep the minimum distance.',
    hints: ['Should we update the distance when we find a longer or shorter path?'],
    difficulty: 'medium',
    tags: ['graphs', 'searching'],
  },

  // ============================================================
  // CATEGORY 7: Dynamic Programming (9 questions)
  // ============================================================
  {
    id: 'dp-1',
    type: 'trace-output',
    question: 'What does this Fibonacci with memoization return for n=6?',
    codeSnippet: `function fib(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}
console.log(fib(6));`,
    language: 'javascript',
    answer: '8',
    explanation: 'fib(6) = fib(5) + fib(4) = 5 + 3 = 8. The sequence is: 0, 1, 1, 2, 3, 5, 8.',
    hints: ['Build up from fib(0)=0, fib(1)=1'],
    difficulty: 'easy',
    tags: ['dynamic-programming', 'recursion'],
  },
  {
    id: 'dp-2',
    type: 'trace-output',
    question: 'What does this coin change function return?',
    codeSnippet: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] + 1 < dp[i]) {
        dp[i] = dp[i - coin] + 1;
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}
console.log(coinChange([1, 5, 10, 25], 30));`,
    language: 'javascript',
    answer: '2',
    explanation: 'The minimum coins for 30 cents: one 25-cent coin + one 5-cent coin = 2 coins. dp[30] = dp[5] + 1 = 1 + 1 = 2.',
    hints: ['dp[i] represents the minimum number of coins needed for amount i'],
    difficulty: 'medium',
    tags: ['dynamic-programming', 'data-structures'],
  },
  {
    id: 'dp-3',
    type: 'multiple-choice',
    question: 'What is the key difference between memoization (top-down) and tabulation (bottom-up) in dynamic programming?',
    options: [
      'Memoization is always faster',
      'Tabulation uses recursion, memoization uses iteration',
      'Memoization solves subproblems on demand; tabulation solves all subproblems iteratively',
      'They always produce different results',
    ],
    answer: 'Memoization solves subproblems on demand; tabulation solves all subproblems iteratively',
    explanation: 'Memoization (top-down) uses recursion and caches results as needed. Tabulation (bottom-up) iteratively fills a table solving all subproblems from smallest to largest.',
    difficulty: 'easy',
    tags: ['dynamic-programming', 'recursion'],
  },
  {
    id: 'dp-4',
    type: 'trace-output',
    question: 'What is the length of the longest common subsequence of "ABCDE" and "ACE"?',
    codeSnippet: `function lcs(s1, s2) {
  const m = s1.length, n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[m][n];
}
console.log(lcs("ABCDE", "ACE"));`,
    language: 'javascript',
    answer: '3',
    explanation: 'The longest common subsequence of "ABCDE" and "ACE" is "ACE" with length 3. Characters A, C, E appear in both strings in order.',
    hints: ['A subsequence does not need to be contiguous'],
    difficulty: 'medium',
    tags: ['dynamic-programming', 'strings'],
  },
  {
    id: 'dp-5',
    type: 'complexity-match',
    question: 'What is the time complexity of the 0/1 knapsack problem solved with dynamic programming, where n is the number of items and W is the capacity?',
    options: ['O(n)', 'O(n * W)', 'O(2^n)', 'O(n^2)'],
    answer: 'O(n * W)',
    explanation: 'The DP table has n rows and W columns. Each cell is computed in O(1), giving O(n * W) total time. Note this is pseudo-polynomial since W is a value, not an input size.',
    difficulty: 'medium',
    tags: ['dynamic-programming', 'complexity'],
  },
  {
    id: 'dp-6',
    type: 'code-fix',
    question: 'This climbing stairs DP solution has a bug. What needs to be fixed?',
    codeSnippet: `function climbStairs(n) {
  if (n <= 2) return n;
  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  dp[2] = 2;
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 3];
  }
  return dp[n];
}`,
    language: 'javascript',
    answer: 'dp[i - 3] should be dp[i - 2]',
    explanation: 'To reach step i, you can come from step i-1 (one step) or step i-2 (two steps). The recurrence should be dp[i] = dp[i-1] + dp[i-2], not dp[i-3].',
    hints: ['How many ways can you arrive at step i? From which previous steps?'],
    difficulty: 'easy',
    tags: ['dynamic-programming', 'recursion'],
  },
  {
    id: 'dp-7',
    type: 'trace-output',
    question: 'What does this 0/1 knapsack function return?',
    codeSnippet: `function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 },
    () => new Array(capacity + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      dp[i][w] = dp[i - 1][w];
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(dp[i][w],
          dp[i - 1][w - weights[i - 1]] + values[i - 1]);
      }
    }
  }
  return dp[n][capacity];
}
console.log(knapsack([2, 3, 4, 5], [3, 4, 5, 6], 5));`,
    language: 'javascript',
    answer: '7',
    explanation: 'With capacity 5: take items with weight 2 (value 3) and weight 3 (value 4) for total weight 5 and total value 7. This is better than any single item.',
    hints: ['Try all combinations that fit within the capacity'],
    difficulty: 'hard',
    tags: ['dynamic-programming', 'data-structures'],
  },
  {
    id: 'dp-8',
    type: 'multiple-choice',
    question: 'Which problem CANNOT be solved with dynamic programming?',
    options: [
      'Longest increasing subsequence',
      'Finding the shortest path in a graph with negative cycles',
      'Edit distance between two strings',
      'Maximum subarray sum',
    ],
    answer: 'Finding the shortest path in a graph with negative cycles',
    explanation: 'DP requires optimal substructure and overlapping subproblems. Graphs with negative cycles have no well-defined shortest path (it goes to negative infinity), so DP cannot solve this.',
    difficulty: 'hard',
    tags: ['dynamic-programming', 'graphs'],
  },
  {
    id: 'dp-9',
    type: 'trace-output',
    question: 'What does this longest increasing subsequence function return?',
    codeSnippet: `function lis(arr) {
  const n = arr.length;
  const dp = new Array(n).fill(1);
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  return Math.max(...dp);
}
console.log(lis([10, 9, 2, 5, 3, 7, 101, 18]));`,
    language: 'javascript',
    answer: '4',
    explanation: 'The longest increasing subsequence is [2, 3, 7, 101] or [2, 5, 7, 101] or [2, 3, 7, 18], each with length 4.',
    hints: ['dp[i] stores the length of the longest increasing subsequence ending at index i'],
    difficulty: 'medium',
    tags: ['dynamic-programming', 'arrays'],
  },

  // ============================================================
  // CATEGORY 8: Sorting & Searching (9 questions)
  // ============================================================
  {
    id: 'sorting-1',
    type: 'trace-output',
    question: 'What is the output after one complete pass of bubble sort?',
    codeSnippet: `function bubbleSortOnePass(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
    }
  }
  return arr;
}
console.log(bubbleSortOnePass([5, 3, 8, 1, 2]).join(','));`,
    language: 'javascript',
    answer: '3,5,1,2,8',
    explanation: 'One pass: compare 5>3 swap [3,5,8,1,2], 5<8 no swap, 8>1 swap [3,5,1,8,2], 8>2 swap [3,5,1,2,8]. The largest element bubbles to the end.',
    hints: ['Bubble sort pushes the largest unsorted element to its final position in each pass'],
    difficulty: 'easy',
    tags: ['sorting', 'data-structures'],
  },
  {
    id: 'sorting-2',
    type: 'complexity-match',
    question: 'What is the worst-case time complexity of quicksort?',
    options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(2^n)'],
    answer: 'O(n^2)',
    explanation: 'Quicksort degrades to O(n^2) when the pivot consistently picks the smallest or largest element, creating maximally unbalanced partitions (e.g., already sorted array with first element as pivot).',
    difficulty: 'medium',
    tags: ['sorting', 'complexity'],
  },
  {
    id: 'sorting-3',
    type: 'multiple-choice',
    question: 'Which sorting algorithm is stable, meaning equal elements maintain their original relative order?',
    options: ['Quicksort', 'Heapsort', 'Merge sort', 'Selection sort'],
    answer: 'Merge sort',
    explanation: 'Merge sort is stable because during the merge step, when two elements are equal, the one from the left half is placed first, preserving the original order.',
    difficulty: 'medium',
    tags: ['sorting', 'data-structures'],
  },
  {
    id: 'sorting-4',
    type: 'trace-output',
    question: 'What does this binary search return?',
    codeSnippet: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
console.log(binarySearch([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 23));`,
    language: 'javascript',
    answer: '5',
    explanation: 'Binary search on sorted array: mid=4 (16<23, go right), mid=7 (56>23, go left), mid=5 (23===23, found!). Returns index 5.',
    hints: ['Track left, right, and mid at each step'],
    difficulty: 'easy',
    tags: ['searching', 'data-structures'],
  },
  {
    id: 'sorting-5',
    type: 'code-fix',
    question: 'This binary search for the leftmost occurrence has a bug. What needs to be fixed?',
    codeSnippet: `function leftmostSearch(arr, target) {
  let left = 0, right = arr.length - 1;
  let result = -1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      result = mid;
      left = mid + 1;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return result;
}`,
    language: 'javascript',
    answer: 'When target is found, should set right = mid - 1 to search left, not left = mid + 1',
    explanation: 'To find the leftmost occurrence, when we find the target we should continue searching left (right = mid - 1) to see if there is an earlier occurrence. Setting left = mid + 1 searches right, finding the rightmost instead.',
    hints: ['After finding target, which direction should you continue searching for the leftmost?'],
    difficulty: 'medium',
    tags: ['searching', 'data-structures'],
  },
  {
    id: 'sorting-6',
    type: 'multiple-choice',
    question: 'What is the average-case time complexity of quickselect (finding the kth smallest element)?',
    options: ['O(log n)', 'O(n)', 'O(n log n)', 'O(n^2)'],
    answer: 'O(n)',
    explanation: 'Quickselect partitions the array but only recurses on one side (unlike quicksort which recurses on both). This gives average T(n) = T(n/2) + O(n) = O(n).',
    difficulty: 'medium',
    tags: ['sorting', 'searching', 'complexity'],
  },
  {
    id: 'sorting-7',
    type: 'trace-output',
    question: 'What is the output of this merge sort?',
    codeSnippet: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
function merge(a, b) {
  const result = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) result.push(a[i++]);
    else result.push(b[j++]);
  }
  return [...result, ...a.slice(i), ...b.slice(j)];
}
console.log(mergeSort([38, 27, 43, 3, 9, 82, 10]).join(','));`,
    language: 'javascript',
    answer: '3,9,10,27,38,43,82',
    explanation: 'Merge sort divides the array recursively, sorts each half, then merges them back. The final sorted array is [3, 9, 10, 27, 38, 43, 82].',
    hints: ['Divide, conquer, then merge sorted halves'],
    difficulty: 'easy',
    tags: ['sorting', 'recursion'],
  },
  {
    id: 'sorting-8',
    type: 'complexity-match',
    question: 'What is the space complexity of merge sort?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    answer: 'O(n)',
    explanation: 'Merge sort requires O(n) additional space for the temporary arrays used during the merge step. The recursion stack adds O(log n), but the dominant term is O(n).',
    difficulty: 'medium',
    tags: ['sorting', 'complexity'],
  },
  {
    id: 'sorting-9',
    type: 'multiple-choice',
    question: 'Which sorting algorithm has O(n + k) time complexity where k is the range of input values?',
    options: ['Quicksort', 'Merge sort', 'Counting sort', 'Insertion sort'],
    answer: 'Counting sort',
    explanation: 'Counting sort counts occurrences of each value in the range [0, k), then uses those counts to place elements. It runs in O(n + k) but only works with non-negative integers in a bounded range.',
    difficulty: 'medium',
    tags: ['sorting', 'complexity'],
  },

  // ============================================================
  // CATEGORY 9: Hash Tables & Sets (8 questions)
  // ============================================================
  {
    id: 'hash-1',
    type: 'trace-output',
    question: 'What does this two-sum function return?',
    codeSnippet: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
console.log(twoSum([2, 7, 11, 15], 9).join(','));`,
    language: 'javascript',
    answer: '0,1',
    explanation: 'i=0: complement=7, not in map, store {2:0}. i=1: complement=2, found in map at index 0. Return [0, 1] since nums[0]+nums[1] = 2+7 = 9.',
    hints: ['For each number, check if its complement (target - num) has been seen before'],
    difficulty: 'easy',
    tags: ['hash-tables', 'arrays'],
  },
  {
    id: 'hash-2',
    type: 'multiple-choice',
    question: 'What is the average time complexity of lookup in a hash table?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
    answer: 'O(1)',
    explanation: 'Hash tables provide O(1) average-case lookup by computing the hash of the key to directly access the bucket. Worst case is O(n) if all keys collide.',
    difficulty: 'easy',
    tags: ['hash-tables', 'complexity'],
  },
  {
    id: 'hash-3',
    type: 'multiple-choice',
    question: 'In open addressing with linear probing, what happens when a collision occurs?',
    options: [
      'The new element is added to a linked list at that bucket',
      'The hash function is changed and the element is rehashed',
      'We check the next sequential slot until an empty one is found',
      'The hash table is immediately resized',
    ],
    answer: 'We check the next sequential slot until an empty one is found',
    explanation: 'Linear probing resolves collisions by sequentially checking the next slot (index + 1, index + 2, ...) until an empty slot is found. This can cause clustering.',
    difficulty: 'medium',
    tags: ['hash-tables', 'data-structures'],
  },
  {
    id: 'hash-4',
    type: 'trace-output',
    question: 'What does this frequency counter return?',
    codeSnippet: `function topKFrequent(nums, k) {
  const freq = new Map();
  for (const n of nums) freq.set(n, (freq.get(n) || 0) + 1);
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(e => e[0]);
}
console.log(topKFrequent([1,1,1,2,2,3], 2).join(','));`,
    language: 'javascript',
    answer: '1,2',
    explanation: 'Frequencies: {1:3, 2:2, 3:1}. Sorted by frequency descending: [(1,3),(2,2),(3,1)]. Top 2 elements are [1, 2].',
    hints: ['Count frequencies first, then sort by count'],
    difficulty: 'easy',
    tags: ['hash-tables', 'sorting'],
  },
  {
    id: 'hash-5',
    type: 'code-fix',
    question: 'This function to group anagrams has a bug. What needs to be fixed?',
    codeSnippet: `function groupAnagrams(strs) {
  const map = new Map();
  for (const s of strs) {
    const key = s.split('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  return [...map.values()];
}
// Expected: [["eat","tea","ate"],["tan","nat"],["bat"]]
groupAnagrams(["eat","tea","tan","ate","nat","bat"]);`,
    language: 'javascript',
    answer: 'The key should be s.split(\'\').sort().join(\'\') to create a string key, not an array',
    explanation: 'Arrays are compared by reference in JavaScript, so using an array as a Map key means every lookup creates a new key. Sort the characters and join them into a string for a proper key.',
    hints: ['What happens when you use an array as a Map key?'],
    difficulty: 'medium',
    tags: ['hash-tables', 'strings'],
  },
  {
    id: 'hash-6',
    type: 'multiple-choice',
    question: 'What is the load factor of a hash table, and why does it matter?',
    options: [
      'Number of buckets / number of elements; determines cache performance',
      'Number of elements / number of buckets; affects collision probability',
      'Number of collisions / number of insertions; measures hash function quality',
      'Number of rehashes / number of operations; determines amortized cost',
    ],
    answer: 'Number of elements / number of buckets; affects collision probability',
    explanation: 'Load factor = n/m (elements/buckets). As it increases, collisions become more likely, degrading performance. Hash tables typically resize when load factor exceeds a threshold (e.g., 0.75).',
    difficulty: 'medium',
    tags: ['hash-tables', 'complexity'],
  },
  {
    id: 'hash-7',
    type: 'trace-output',
    question: 'What does this function to find the longest consecutive sequence return?',
    codeSnippet: `function longestConsecutive(nums) {
  const set = new Set(nums);
  let longest = 0;
  for (const num of set) {
    if (!set.has(num - 1)) {
      let current = num;
      let streak = 1;
      while (set.has(current + 1)) {
        current++;
        streak++;
      }
      longest = Math.max(longest, streak);
    }
  }
  return longest;
}
console.log(longestConsecutive([100, 4, 200, 1, 3, 2]));`,
    language: 'javascript',
    answer: '4',
    explanation: 'The longest consecutive sequence is [1, 2, 3, 4] with length 4. The algorithm starts counting only from sequence beginnings (numbers without a predecessor in the set).',
    hints: ['Only start counting from the beginning of a sequence (when num-1 is not in the set)'],
    difficulty: 'medium',
    tags: ['hash-tables', 'arrays'],
  },
  {
    id: 'hash-8',
    type: 'complexity-match',
    question: 'What is the worst-case time complexity of a hash table lookup when using chaining for collision resolution?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
    answer: 'O(n)',
    explanation: 'In the worst case, all n elements hash to the same bucket, forming a single chain (linked list) of length n. Searching this chain takes O(n). This is rare with a good hash function.',
    difficulty: 'medium',
    tags: ['hash-tables', 'complexity'],
  },

  // ============================================================
  // CATEGORY 10: Recursion & Backtracking (9 questions)
  // ============================================================
  {
    id: 'recursion-1',
    type: 'trace-output',
    question: 'What does this recursive power function return?',
    codeSnippet: `function power(base, exp) {
  if (exp === 0) return 1;
  if (exp % 2 === 0) {
    const half = power(base, exp / 2);
    return half * half;
  }
  return base * power(base, exp - 1);
}
console.log(power(2, 10));`,
    language: 'javascript',
    answer: '1024',
    explanation: 'This is fast exponentiation. 2^10 = (2^5)^2 = (2 * 2^4)^2 = (2 * (2^2)^2)^2 = (2 * 4^2)^2 = (2*16)^2 = 32^2 = 1024.',
    hints: ['This uses the divide-and-conquer approach: x^n = (x^(n/2))^2 for even n'],
    difficulty: 'easy',
    tags: ['recursion', 'data-structures'],
  },
  {
    id: 'recursion-2',
    type: 'trace-output',
    question: 'How many permutations does this function generate for [1,2,3]?',
    codeSnippet: `function permutations(arr) {
  const result = [];
  function backtrack(current, remaining) {
    if (remaining.length === 0) {
      result.push([...current]);
      return;
    }
    for (let i = 0; i < remaining.length; i++) {
      current.push(remaining[i]);
      backtrack(current, [...remaining.slice(0, i), ...remaining.slice(i + 1)]);
      current.pop();
    }
  }
  backtrack([], arr);
  return result.length;
}
console.log(permutations([1, 2, 3]));`,
    language: 'javascript',
    answer: '6',
    explanation: 'The number of permutations of 3 elements is 3! = 6. They are: [1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1].',
    hints: ['The number of permutations of n elements is n!'],
    difficulty: 'easy',
    tags: ['recursion', 'backtracking'],
  },
  {
    id: 'recursion-3',
    type: 'trace-output',
    question: 'How many subsets does this function generate for [1,2,3]?',
    codeSnippet: `function subsets(nums) {
  const result = [];
  function backtrack(start, current) {
    result.push([...current]);
    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }
  backtrack(0, []);
  return result.length;
}
console.log(subsets([1, 2, 3]));`,
    language: 'javascript',
    answer: '8',
    explanation: 'The number of subsets of a set with n elements is 2^n. For n=3: 2^3 = 8. The subsets are: [], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3].',
    hints: ['Each element is either included or excluded, giving 2^n total subsets'],
    difficulty: 'easy',
    tags: ['recursion', 'backtracking'],
  },
  {
    id: 'recursion-4',
    type: 'multiple-choice',
    question: 'What are the two essential components of any recursive function?',
    options: [
      'A loop and a counter',
      'A base case and a recursive case',
      'A stack and a queue',
      'A condition and an accumulator',
    ],
    answer: 'A base case and a recursive case',
    explanation: 'Every recursive function needs: (1) a base case that stops the recursion, and (2) a recursive case that breaks the problem down and calls itself with a smaller input.',
    difficulty: 'easy',
    tags: ['recursion', 'data-structures'],
  },
  {
    id: 'recursion-5',
    type: 'code-fix',
    question: 'This N-Queens backtracking solution has a bug. What needs to be fixed?',
    codeSnippet: `function solveNQueens(n) {
  const result = [];
  const board = Array.from({ length: n }, () => '.'.repeat(n).split(''));
  function isValid(row, col) {
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') return false;
    }
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') return false;
    }
    // Missing: check upper-right diagonal
    return true;
  }
  function backtrack(row) {
    if (row === n) { result.push(board.map(r => r.join(''))); return; }
    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        board[row][col] = 'Q';
        backtrack(row + 1);
        board[row][col] = '.';
      }
    }
  }
  backtrack(0);
  return result.length;
}`,
    language: 'javascript',
    answer: 'Missing upper-right diagonal check: need a loop for i=row-1,j=col+1 checking i>=0 && j<n',
    explanation: 'The isValid function checks the column and upper-left diagonal but forgets the upper-right diagonal. Add: for (let i=row-1, j=col+1; i>=0 && j<n; i--, j++) if board[i][j]==="Q" return false.',
    hints: ['Queens can attack in all 8 directions. Which diagonal is not being checked?'],
    difficulty: 'hard',
    tags: ['recursion', 'backtracking'],
  },
  {
    id: 'recursion-6',
    type: 'complexity-match',
    question: 'What is the time complexity of generating all permutations of n elements?',
    options: ['O(n)', 'O(n^2)', 'O(n!)', 'O(2^n)'],
    answer: 'O(n!)',
    explanation: 'There are n! permutations, and generating each one takes at least O(1) work. The total number of recursive calls follows the pattern n * (n-1) * ... * 1 = n!.',
    difficulty: 'medium',
    tags: ['recursion', 'backtracking', 'complexity'],
  },
  {
    id: 'recursion-7',
    type: 'trace-output',
    question: 'What does this combination sum function return for target 7?',
    codeSnippet: `function combinationSum(candidates, target) {
  const result = [];
  function backtrack(start, current, remaining) {
    if (remaining === 0) { result.push([...current]); return; }
    if (remaining < 0) return;
    for (let i = start; i < candidates.length; i++) {
      current.push(candidates[i]);
      backtrack(i, current, remaining - candidates[i]);
      current.pop();
    }
  }
  backtrack(0, [], target);
  return result.length;
}
console.log(combinationSum([2, 3, 6, 7], 7));`,
    language: 'javascript',
    answer: '2',
    explanation: 'The two combinations that sum to 7 are: [2,2,3] and [7]. Note that candidates can be reused (backtrack starts from i, not i+1).',
    hints: ['Elements can be reused since backtrack passes i (not i+1) as the start'],
    difficulty: 'medium',
    tags: ['recursion', 'backtracking'],
  },
  {
    id: 'recursion-8',
    type: 'multiple-choice',
    question: 'What is the difference between backtracking and brute force?',
    options: [
      'They are the same thing',
      'Backtracking prunes invalid paths early; brute force explores all possibilities',
      'Brute force is always faster than backtracking',
      'Backtracking uses iteration; brute force uses recursion',
    ],
    answer: 'Backtracking prunes invalid paths early; brute force explores all possibilities',
    explanation: 'Backtracking is an optimization over brute force that abandons a solution path as soon as it determines it cannot lead to a valid solution (pruning), avoiding unnecessary exploration.',
    difficulty: 'medium',
    tags: ['recursion', 'backtracking'],
  },
  {
    id: 'recursion-9',
    type: 'code-fix',
    question: 'This recursive function to generate parentheses has a bug. What needs to be fixed?',
    codeSnippet: `function generateParenthesis(n) {
  const result = [];
  function backtrack(current, open, close) {
    if (current.length === 2 * n) {
      result.push(current);
      return;
    }
    if (open < n) {
      backtrack(current + '(', open + 1, close);
    }
    if (close < open) {
      backtrack(current + ')', open, close);
    }
  }
  backtrack('', 0, 0);
  return result;
}
// Expected for n=2: ["(())", "()()" ]
// But this returns: ["((", "()"]`,
    language: 'javascript',
    answer: 'The close condition should be close < open, but close must also be incremented: backtrack(current + \')\', open, close + 1)',
    explanation: 'When adding a closing parenthesis, the close counter must be incremented (close + 1), not left unchanged. Without incrementing, close stays at 0 forever and the function generates too many open parens.',
    hints: ['Look at how the close counter changes when adding a closing parenthesis'],
    difficulty: 'hard',
    tags: ['recursion', 'backtracking', 'strings'],
  },
];

// ============================================================
// Categories and helper functions
// ============================================================

export const categories = [
  { id: 'arrays', name: 'Arrays & Strings', icon: 'brackets' },
  { id: 'linked-lists', name: 'Linked Lists', icon: 'link' },
  { id: 'stacks', name: 'Stacks & Queues', icon: 'layers' },
  { id: 'trees', name: 'Trees & BST', icon: 'git-branch' },
  { id: 'heaps', name: 'Heaps & Priority Queues', icon: 'triangle' },
  { id: 'graphs', name: 'Graphs', icon: 'share-2' },
  { id: 'dynamic-programming', name: 'Dynamic Programming', icon: 'table' },
  { id: 'sorting', name: 'Sorting & Searching', icon: 'arrow-up-down' },
  { id: 'hash-tables', name: 'Hash Tables & Sets', icon: 'hash' },
  { id: 'recursion', name: 'Recursion & Backtracking', icon: 'repeat' },
];

export function getQuestionsByCategory(category: string): ExerciseQuestion[] {
  return sampleQuestions.filter(q => q.tags.includes(category as ExerciseQuestion['tags'][number]));
}

export function getQuestionsByDifficulty(difficulty: string): ExerciseQuestion[] {
  return sampleQuestions.filter(q => q.difficulty === difficulty);
}
