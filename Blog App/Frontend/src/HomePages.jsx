import React from 'react';
import CardV2 from './CardV2';

function HomePages({ blogPosts }) {
    return (
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
                <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
                    The Blog
                </h2>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                    See how game-changing companies are making the most of every engagement with Preline.
                </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.length > 0 ? (
                    blogPosts.map(post => (
                        <div key={post._id}>
                            <CardV2
                                title={post.title}
                                content={post.content}
                            />
                        </div>
                    ))
                ) : (
                    <p>No posts found</p>
                )}
            </div>
        </div>
    );
}

export default HomePages;
