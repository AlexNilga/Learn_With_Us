import {useEffect, useState} from "react";

export default function Request() {
    const URL = 'https://jsonplaceholder.typicode.com/posts'

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(URL)
            const posts = await response.json()
            setPosts(posts)
        }
        fetchPosts()
    }, []);

    return posts
}

