/**
 * Basic implementation of Lavenshtein algorithm.
 * Count minimum distance between two words of single-character
 * edits (insertions, deletions or substitutions) required
 * to change one word into the other
 * @author CombatCode <https://github.com/CombatCode>
 * @function Lavenshtein
 * @param str1 {string}
 * @param str2 {string}
 * @returns {number} - distance
 */
function Lavenshtein(str1, str2) {
    if (typeof str1 !== 'string' || typeof str2 !== 'string') {
        throw Error('argument must be a string')
    }
    if (str1.length === 0) { return str2.length; }
    if (str2.length === 0) { return str1.length; }
    if (str1 === str2) { return 0; }

    var matrix = [];
    // Fit matrix to str2.length columns size
    for (var c = 0; c < str2.length; c++) { matrix[c] = [c]; }
    // Fit matrix to str1.length in the first row
    for (var r = 0; r < str1.length; r++) { matrix[0][r] = [r]; }

    // Fill the rest of matrix
    for (var i = 1; i < str2.length; i++) {
        for (var j = 1; j < str1.length; j++) {
            if (str2.charAt(i-1) === str1.charAt(j-1)) {
                matrix[i][j] = matrix[i-1][j-1]
            } else {
                matrix[i][j] = Math.min(
                    matrix[i-1][j-1] + 1, // Substitution
                    Math.min(
                        matrix[i][j-1] + 1, // Insertion
                        matrix[i-1][j] + 1
                    )
                ); // Deletion
            }
        }
    }

    return matrix[str2.length - 1][str1.length - 1]
}
