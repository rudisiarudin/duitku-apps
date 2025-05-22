type TransactionCardProps = {
  title: string;
  subtitle: string;
  amount: number;
  date: string;
  icon: string;
  onEdit?: () => void; // callback saat tombol edit ditekan
};

const TransactionCard = ({
  title,
  subtitle,
  amount,
  date,
  icon,
  onEdit,
}: TransactionCardProps) => {
  return (
    <div className="transaction-card p-3 border rounded flex justify-between items-center mb-2">
      <div className="flex items-center gap-3">
        {/* Icon kategori */}
        <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
          {/* Bisa pakai icon svg sesuai kategori */}
          <img src={`/icons/${icon}.svg`} alt={icon} className="w-6 h-6" />
        </div>

        <div>
          <p className="font-semibold text-gray-800">{title}</p>
          <p className="text-sm text-gray-500">{subtitle}</p>
          <p className="text-xs text-gray-400">{date}</p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1">
        <p
          className={`font-semibold ${
            amount >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          Rp{amount.toLocaleString("id-ID")}
        </p>

        {onEdit && (
          <button
            onClick={onEdit}
            className="text-blue-500 hover:underline text-xs"
            type="button"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default TransactionCard;
