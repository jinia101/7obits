export default function PortalPage({ params }: { params: { token: string } }) {
  return (
    <div>
      <h1>Portal [token: {params.token}]</h1>
    </div>
  );
}
