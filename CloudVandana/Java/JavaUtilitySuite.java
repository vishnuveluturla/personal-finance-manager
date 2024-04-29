import java.util.Random;
import java.util.HashMap;
import java.util.Map;
import java.util.HashSet;
import java.util.Scanner;
import java.util.Set;

public class JavaUtilitySuite {

    public static void main(String[] args) {
        // A. Shuffle an Array
        int[] array = {1, 2, 3, 4, 5, 6, 7};
        shuffleArray(array);
        
        System.out.println("Shuffled Array:");
        for (int num : array) {
            System.out.print(num + " ");
        }
        System.out.println("\n");

        // B. Convert Roman Number to Integer
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter a Roman Number:");
        String romanNumber = scanner.nextLine();

        int result = convertToInteger(romanNumber);
        System.out.println("Integer equivalent of " + romanNumber + " is: " + result + "\n");

        // C. Check if Input is a Pangram
        System.out.println("Enter a sentence:");
        String input = scanner.nextLine();
        
        boolean isPangram = checkIfPangram(input);
        
        if (isPangram) {
            System.out.println("The input is a pangram.");
        } else {
            System.out.println("The input is not a pangram.");
        }
        
        scanner.close();
    }

    // Fisher-Yates shuffle algorithm
    private static void shuffleArray(int[] array) {
        Random rand = new Random();
        for (int i = array.length - 1; i > 0; i--) {
            int j = rand.nextInt(i + 1);
            
            // Swap array[i] and array[j]
            int temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    private static int convertToInteger(String romanNumber) {
        Map<Character, Integer> romanMap = new HashMap<>();
        romanMap.put('I', 1);
        romanMap.put('V', 5);
        romanMap.put('X', 10);
        romanMap.put('L', 50);
        romanMap.put('C', 100);
        romanMap.put('D', 500);
        romanMap.put('M', 1000);

        int result = 0;

        for (int i = 0; i < romanNumber.length(); i++) {
            int currentNum = romanMap.get(romanNumber.charAt(i));
            int nextNum = (i < romanNumber.length() - 1) ? romanMap.get(romanNumber.charAt(i + 1)) : 0;

            if (currentNum < nextNum) {
                result += (nextNum - currentNum);
                i++; // Skip the next numeral, as it has already been considered
            } else {
                result += currentNum;
            }
        }

        return result;
    }

    private static boolean checkIfPangram(String input) {
        Set<Character> alphabetSet = new HashSet<>();
        for (char ch = 'a'; ch <= 'z'; ch++) {
            alphabetSet.add(ch);
        }

        for (char ch : input.toLowerCase().toCharArray()) {
            alphabetSet.remove(ch);
            if (alphabetSet.isEmpty()) {
                return true; // All letters are covered
            }
        }

        return false;
    }
}
