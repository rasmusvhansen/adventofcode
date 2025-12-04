AOC_COOKIE="GET FROM AOC SITE"
AOC="/Users/rasmus/git/adventofcode"
alias jaos="cd $AOC; bun src/solution.ts in.txt"
alias jaot="cd $AOC; bun src/solution.ts test.txt"
alias jaoc="jaot; echo; jaos"

function aoc-load () {
    YEAR=$( date '+%Y' )
    DAY=$( date +"%Oe") 
    if [ $1 ]
    then
        curl --cookie "session=$AOC_COOKIE" https://adventofcode.com/$1/day/$2/input > in.txt
        node scrapeTest.ts "https://adventofcode.com/$1/day/$2"
    else
        curl --cookie "session=$AOC_COOKIE" "$(echo `date +https://adventofcode.com/%Y/day/%d/input` | sed 's/\/0/\//g')" > in.txt
        node scrapeTest.ts "https://adventofcode.com/$YEAR/day/$DAY"
    fi
}
