type Props = {
  data: Truck;
  editable?: boolean;
  onChange?: (field: string, value: any) => void;
};

export function TruckDetail({ data, editable }: Props) {
  return (
    <>
      {/* Header */}
      <TruckHeader code={data.code} />

      {/* Image */}
      <TruckImage />

      {/* Information Card */}
      <TruckInfoCard data={data} editable={editable} />

      {/* Tracking */}
      <TrackingHistory history={data.tracking} />
    </>
  );
}
