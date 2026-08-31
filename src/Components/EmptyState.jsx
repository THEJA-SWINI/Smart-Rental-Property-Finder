function EmptyState({ message }) {
  return (
    <div className="empty-state">
      <h3>😕 Nothing Found</h3>
      <p>{message}</p>
    </div>
  );
}

export default EmptyState;