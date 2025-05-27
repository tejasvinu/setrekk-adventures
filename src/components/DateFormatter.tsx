import { format, parseISO } from 'date-fns';

interface DateFormatterProps {
  dateString: string;
  formatString?: string;
  className?: string;
}

const DateFormatter: React.FC<DateFormatterProps> = ({ 
  dateString, 
  formatString = 'MMMM dd, yyyy',
  className = ''
}) => {
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : new Date(dateString);
    return (
      <time dateTime={dateString} className={className}>
        {format(date, formatString)}
      </time>
    );
  } catch (error) {
    console.error('Error formatting date:', error);
    return <span className={className}>Invalid date</span>;
  }
};

export default DateFormatter;
