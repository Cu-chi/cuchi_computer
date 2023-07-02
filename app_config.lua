AppConfig = {
    Market = {
        delayBetweenEachPost = 600, -- seconds
        maxPosts = 5, -- max posts a user can have active
        timeBeforeAutomaticDeletion = 14 * 86400 -- seconds (basically: days * seconds_in_one_day) | Time before the row in the database is deleted
    }
}