import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ThreadItem, { threadItemShape } from "./ThreadItem";
import { Container } from "react-bootstrap";
import CategoryBadge from "./CategoryBadge";

function ThreadsList({
  threads,
  upVoteThread,
  downVoteThread,
  neutralizeVoteThread,
}) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredThreads, setFilteredThreads] = useState(threads);
  const [uniqueCategories, setUniqueCategories] = useState([]);

  // Extract unique categories from threads
  useEffect(() => {
    const categories = [...new Set(threads.map((thread) => thread.category))];
    setUniqueCategories(categories);
  }, [threads]);

  // Filter threads when selectedCategory changes
  useEffect(() => {
    if (selectedCategory) {
      setFilteredThreads(
        threads.filter((thread) => thread.category === selectedCategory)
      );
    } else {
      setFilteredThreads(threads);
    }
  }, [selectedCategory, threads]);

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      // If the same category is clicked again, clear the filter
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <Container
      fluid
      className="pb-5 px-5 d-flex flex-column gap-3 justify-content-center align-items-center"
    >
      <div className="w-50">
        <p className="text-start fs-4 fw-semibold">Diskusi Tersedia</p>
        <div>
          <p className="fs-5 fw-semibold">Kategori Populer</p>
          <div className="d-flex gap-2 flex-wrap">
            {uniqueCategories.map((category) => (
              <CategoryBadge
                key={category}
                category={category}
                onCategoryClick={handleCategoryClick}
                isActive={selectedCategory === category}
              />
            ))}
          </div>
        </div>
        {filteredThreads.map((thread) => (
          <ThreadItem
            key={thread.id}
            {...thread}
            upVote={upVoteThread}
            downVote={downVoteThread}
            neutralizeVote={neutralizeVoteThread}
          />
        ))}
      </div>
    </Container>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  upVoteThread: PropTypes.func.isRequired,
  downVoteThread: PropTypes.func.isRequired,
  neutralizeVoteThread: PropTypes.func.isRequired,
};

export default ThreadsList;
