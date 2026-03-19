
import React, { useState, useEffect, useCallback } from 'react';

// Mock Icons for demonstration
const Icon = ({ name, size = 20, color = 'currentColor' }) => {
  const icons = {
    dashboard: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18.7 8l-5.3 5.3-2.7-2.7L7 14"/><path d="M18.7 8H13.7V3"/></svg>,
    requests: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    settings: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0-.33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1.82.33 1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.82.33z"/></svg>,
    user: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    chevronRight: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
    plus: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    filter: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
    search: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    trendingUp: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    trendingDown: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>,
    activity: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    checkCircle: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-8.87"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
    xCircle: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>,
    info: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>,
    upload: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>,
    dollarSign: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>,
    clipboard: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>,
    package: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.2"/><path d="M2.5 17.5L12 23L21.5 17.5V6.5L12 1L2.5 6.5Z"/><path d="M12 1V23"/><path d="M12 12L21.5 6.5"/><path d="M12 12L2.5 6.5"/><path d="M12 12L12 23"/></svg>,
    barChart: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>,
    fileText: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>,
  };
  return icons[name] || null;
};

// RBAC Configuration
const ROLES = {
  'Business User': {
    canViewDashboard: true,
    canInitiateRequest: true,
    canViewAllRequests: false,
    canViewOwnRequests: true,
    canApprove: false,
    canManageSuppliers: false,
    canExportData: false,
    canInlineEdit: false,
    canViewAuditLogs: true,
    canViewInventory: true,
    canCreateInventoryItem: true,
    canEditInventoryItem: false,
  },
  'Procurement Officer': {
    canViewDashboard: true,
    canInitiateRequest: true,
    canViewAllRequests: true,
    canViewOwnRequests: true,
    canApprove: true,
    canManageSuppliers: true,
    canExportData: true,
    canInlineEdit: true,
    canViewAuditLogs: true,
    canViewInventory: true,
    canCreateInventoryItem: true,
    canEditInventoryItem: true,
  },
  'Supplier': {
    canViewDashboard: false,
    canInitiateRequest: false,
    canViewAllRequests: false,
    canViewOwnRequests: true, // For their own RFQ responses/catalog
    canApprove: false,
    canManageSuppliers: false,
    canExportData: false,
    canInlineEdit: false,
    canViewAuditLogs: true, // For their own activities
    canViewInventory: false, // Suppliers don't view internal inventory
    canCreateInventoryItem: false,
    canEditInventoryItem: false,
  },
};

// --- Reusable Components ---

const Button = ({ children, onClick, variant = 'primary', ...props }) => {
  return (
    <button className={`button button-${variant}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

const Card = ({ children, onClick, style, className = '' }) => {
  return (
    <div
      className={`card ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
};

const StatusTag = ({ status }) => {
  let statusClass = '';
  let statusText = '';
  switch (status) {
    case 'Approved':
      statusClass = 'status-approved';
      statusText = 'Approved';
      break;
    case 'In Progress':
      statusClass = 'status-inprogress';
      statusText = 'In Progress';
      break;
    case 'Pending':
      statusClass = 'status-pending';
      statusText = 'Pending Approval';
      break;
    case 'Rejected':
      statusClass = 'status-rejected';
      statusText = 'Rejected';
      break;
    case 'Exception':
      statusClass = 'status-exception';
      statusText = 'Exception';
      break;
    case 'In Stock':
      statusClass = 'status-in-stock';
      statusText = 'In Stock';
      break;
    case 'Low Stock':
      statusClass = 'status-low-stock';
      statusText = 'Low Stock';
      break;
    case 'Out of Stock':
      statusClass = 'status-out-of-stock';
      statusText = 'Out of Stock';
      break;
    default:
      statusClass = 'status-inprogress'; // Default or unknown
      statusText = status;
  }
  return <span className={`status-tag ${statusClass}`}>{statusText}</span>;
};

const Input = ({ label, type = 'text', name, value, onChange, placeholder, required, error, disabled, ...props }) => (
  <div className="form-group">
    {label && <label htmlFor={name}>{label}{required && '*'}</label>}
    <input
      type={type}
      id={name}
      name={name}
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      {...props}
    />
    {error && <div className="error-message">{error}</div>}
  </div>
);

const Select = ({ label, name, value, onChange, options, required, error, disabled, ...props }) => (
  <div className="form-group">
    {label && <label htmlFor={name}>{label}{required && '*'}</label>}
    <select
      id={name}
      name={name}
      value={value || ''}
      onChange={onChange}
      required={required}
      disabled={disabled}
      {...props}
    >
      <option value="">{`Select ${label}`}</option>
      {options?.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
    {error && <div className="error-message">{error}</div>}
  </div>
);

const Textarea = ({ label, name, value, onChange, placeholder, required, error, disabled, ...props }) => (
  <div className="form-group">
    {label && <label htmlFor={name}>{label}{required && '*'}</label>}
    <textarea
      id={name}
      name={name}
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      {...props}
    />
    {error && <div className="error-message">{error}</div>}
  </div>
);

const FileUpload = ({ label, name, onFileChange, required, error, disabled, ...props }) => (
  <div className="form-group">
    {label && <label htmlFor={name}>{label}{required && '*'}</label>}
    <input
      type="file"
      id={name}
      name={name}
      onChange={onFileChange}
      required={required}
      disabled={disabled}
      style={{ border: 'none', padding: 'var(--spacing-xs)', backgroundColor: 'transparent' }}
      {...props}
    />
    {error && <div className="error-message">{error}</div>}
  </div>
);

const Breadcrumbs = ({ path, onNavigate }) => (
  <div className="breadcrumbs">
    {path?.map((item, index) => (
      <React.Fragment key={item.label}>
        {index > 0 && <span>/</span>}
        {item.onClick ? (
          <a onClick={item.onClick} style={{ cursor: 'pointer' }}>{item.label}</a>
        ) : (
          <span>{item.label}</span>
        )}
      </React.Fragment>
    ))}
  </div>
);

const ChartComponent = ({ type, title, data, label, className = '' }) => {
  return (
    <div className={`chart-container ${className}`}>
      <h4>{title}</h4>
      <p style={{ marginTop: 'var(--spacing-md)' }}>{`[${type} Chart Placeholder for ${label}]`}</p>
      {/* In a real app, this would use a chart library like Recharts or Chart.js */}
    </div>
  );
};

const EmptyState = ({ icon, title, message, callToAction, onAction }) => (
  <div className="empty-state">
    <div className="empty-state-icon">
      <Icon name={icon} size={64} color="var(--text-muted)" />
    </div>
    <h3>{title}</h3>
    <p>{message}</p>
    {callToAction && onAction && (
      <Button onClick={onAction}>{callToAction}</Button>
    )}
  </div>
);

const Modal = ({ isOpen, onClose, title, children, footer, className = '' }) => {
  if (!isOpen) return null;

  return (
    <div className={`modal-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className={`modal-content ${className}`} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        {footer && <div className="sticky-footer">{footer}</div>}
      </div>
    </div>
  );
};

// --- Mock Data ---
const mockDashboardData = {
  kpis: [
    { id: 'spend', title: 'Total Spend (Last 30 Days)', value: '$1.2M', trend: 'up', percentage: '5%', color: 'var(--color-success)', icon: 'dollarSign' },
    { id: 'rfq', title: 'Open RFQs', value: '78', trend: 'down', percentage: '2%', color: 'var(--color-danger)', icon: 'clipboard' },
    { id: 'po', title: 'POs Issued', value: '450', trend: 'up', percentage: '12%', color: 'var(--color-success)', icon: 'package' },
    { id: 'pending', title: 'Pending Approvals', value: '15', trend: 'up', percentage: '10%', color: 'var(--color-warning)', icon: 'info' },
  ],
  spendByCategory: [
    { category: 'Software', amount: 300000 },
    { category: 'Hardware', amount: 200000 },
    { category: 'Services', amount: 500000 },
    { category: 'Office Supplies', amount: 100000 },
  ],
  openRFQsTrend: [
    { month: 'Jan', count: 50 }, { month: 'Feb', count: 45 }, { month: 'Mar', count: 60 },
    { month: 'Apr', count: 55 }, { month: 'May', count: 70 }, { month: 'Jun', count: 78 }
  ],
  recentActivities: [
    { id: 'act1', type: 'Request Submitted', description: 'RFQ #TSM-00123 for Marketing Software', user: 'Alice Johnson', time: '5 mins ago' },
    { id: 'act2', type: 'Approval', description: 'PO #TSM-PO-0098 approved by Procurement Officer Bob', user: 'Bob Smith', time: '1 hour ago' },
    { id: 'act3', type: 'Supplier Onboarded', description: 'New supplier "Tech Solutions Inc." registered', user: 'Admin', time: '3 hours ago' },
    { id: 'act4', type: 'Quote Received', description: 'Quote for RFQ #TSM-00120 received from "Global Supplies"', user: 'Global Supplies', time: '1 day ago' },
  ],
};

const mockProcurementRequests = [
  {
    id: 'TSM-REQ-001',
    title: 'New Laptops for Marketing Team',
    description: 'Request for 10 high-performance laptops for the marketing department.',
    status: 'Pending',
    assignedTo: 'Procurement Officer Bob',
    submittedBy: 'Alice Johnson',
    submittedDate: '2023-10-20',
    dueDate: '2023-11-15',
    totalValue: '$15,000',
    category: 'Hardware',
    workflow: [
      { stage: 'Initiated', date: '2023-10-20', completed: true, sla: '5 days' },
      { stage: 'Manager Approval', date: '2023-10-21', completed: true, approver: 'John Doe' },
      { stage: 'Procurement Review', date: '2023-10-22', completed: true, sla: '3 days', reviewer: 'Bob Smith' },
      { stage: 'RFQ Sent', date: null, completed: false, sla: '7 days' },
      { stage: 'Quote Evaluation', date: null, completed: false },
      { stage: 'PO Issued', date: null, completed: false },
      { stage: 'Delivered', date: null, completed: false },
    ],
    newsFeed: [
      { id: 'nf1', type: 'Comment', user: 'Alice Johnson', timestamp: '2023-10-22 14:30', content: 'Received initial quotes from Dell and HP. Awaiting Lenovo.' },
      { id: 'nf2', type: 'Status Update', user: 'Procurement Officer Bob', timestamp: '2023-10-22 10:15', content: 'Moved to Procurement Review.' },
      { id: 'nf3', type: 'File Upload', user: 'Alice Johnson', timestamp: '2023-10-20 16:00', content: 'Uploaded detailed specification document (laptops_spec.pdf).' },
    ],
    relatedRecords: [
      { id: 'TSM-SUP-010', type: 'Supplier', name: 'Dell Technologies', status: 'Approved' },
      { id: 'TSM-SUP-011', type: 'Supplier', name: 'HP Inc.', status: 'Approved' },
    ],
    documents: [
      { name: 'laptops_spec.pdf', size: '2.5 MB', type: 'PDF', uploadedBy: 'Alice Johnson', uploadedDate: '2023-10-20' },
      { name: 'quote_dell.pdf', size: '1.2 MB', type: 'PDF', uploadedBy: 'Dell Technologies', uploadedDate: '2023-10-22' },
    ]
  },
  {
    id: 'TSM-REQ-002',
    title: 'Office Supplies Bulk Order',
    description: 'Consolidated order for general office supplies for Q4.',
    status: 'Approved',
    assignedTo: 'Procurement Officer Bob',
    submittedBy: 'David Lee',
    submittedDate: '2023-10-15',
    dueDate: '2023-10-30',
    totalValue: '$3,500',
    category: 'Office Supplies',
    workflow: [
      { stage: 'Initiated', date: '2023-10-15', completed: true, sla: '5 days' },
      { stage: 'Manager Approval', date: '2023-10-16', completed: true, approver: 'Jane Smith' },
      { stage: 'Procurement Review', date: '2023-10-17', completed: true, sla: '3 days', reviewer: 'Bob Smith' },
      { stage: 'RFQ Sent', date: '2023-10-18', completed: true, sla: '7 days' },
      { stage: 'Quote Evaluation', date: '2023-10-20', completed: true },
      { stage: 'PO Issued', date: '2023-10-21', completed: true },
      { stage: 'Delivered', date: null, completed: false },
    ],
    newsFeed: [
      { id: 'nf4', type: 'Status Update', user: 'Procurement Officer Bob', timestamp: '2023-10-21 11:00', content: 'PO #TSM-PO-0099 Issued to Office Depot.' },
      { id: 'nf5', type: 'Comment', user: 'David Lee', timestamp: '2023-10-19 09:00', content: 'Please ensure ergonomic chairs are included.' },
    ],
    relatedRecords: [
      { id: 'TSM-SUP-005', type: 'Supplier', name: 'Office Depot', status: 'Approved' },
    ],
    documents: [
      { name: 'office_supplies_list.xlsx', size: '500 KB', type: 'Excel', uploadedBy: 'David Lee', uploadedDate: '2023-10-15' },
    ]
  },
  {
    id: 'TSM-REQ-003',
    title: 'Consulting Services for Cloud Migration',
    description: 'Engage external consultants for a cloud migration strategy.',
    status: 'In Progress',
    assignedTo: 'Procurement Officer Sarah',
    submittedBy: 'Emily White',
    submittedDate: '2023-09-28',
    dueDate: '2023-11-30',
    totalValue: '$80,000',
    category: 'Services',
    workflow: [
      { stage: 'Initiated', date: '2023-09-28', completed: true, sla: '5 days' },
      { stage: 'Manager Approval', date: '2023-09-29', completed: true, approver: 'Mark Green' },
      { stage: 'Procurement Review', date: '2023-10-01', completed: true, sla: '3 days', reviewer: 'Sarah Connor' },
      { stage: 'RFQ Sent', date: '2023-10-05', completed: true, sla: '7 days' },
      { stage: 'Quote Evaluation', date: '2023-10-15', completed: false, sla: '10 days' },
      { stage: 'PO Issued', date: null, completed: false },
      { stage: 'Project Kick-off', date: null, completed: false },
    ],
    newsFeed: [
      { id: 'nf6', type: 'Status Update', user: 'Procurement Officer Sarah', timestamp: '2023-10-15 16:00', content: 'Quotes received from Accenture and Deloitte. Review in progress.' },
      { id: 'nf7', type: 'Comment', user: 'Emily White', timestamp: '2023-10-10 11:00', content: 'Please prioritize expertise in AWS and Azure.' },
    ],
    relatedRecords: [],
    documents: [
      { name: 'cloud_migration_RFP.pdf', size: '3.1 MB', type: 'PDF', uploadedBy: 'Emily White', uploadedDate: '2023-09-28' },
    ]
  },
  {
    id: 'TSM-REQ-004',
    title: 'Renewal of CRM Software License',
    description: 'Annual renewal for Salesforce CRM licenses for 200 users.',
    status: 'Exception',
    assignedTo: 'Procurement Officer Bob',
    submittedBy: 'Alice Johnson',
    submittedDate: '2023-09-01',
    dueDate: '2023-10-01',
    totalValue: '$120,000',
    category: 'Software',
    workflow: [
      { stage: 'Initiated', date: '2023-09-01', completed: true, sla: '5 days' },
      { stage: 'Manager Approval', date: '2023-09-02', completed: true, approver: 'John Doe' },
      { stage: 'Procurement Review', date: '2023-09-03', completed: true, sla: '3 days', reviewer: 'Bob Smith' },
      { stage: 'RFQ Sent', date: '2023-09-05', completed: true, sla: '7 days' },
      { stage: 'Quote Evaluation', date: '2023-09-10', completed: true },
      { stage: 'PO Issued', date: '2023-09-15', completed: true, slaBreached: true }, // SLA Breached
      { stage: 'Contract Signed', date: null, completed: false },
    ],
    newsFeed: [
      { id: 'nf8', type: 'Alert', user: 'System', timestamp: '2023-09-15 08:00', content: 'SLA BREACHED: PO Issuance for TSM-REQ-004 was delayed by 5 days.' },
      { id: 'nf9', type: 'Comment', user: 'Procurement Officer Bob', timestamp: '2023-09-14 17:30', content: 'Delay in PO due to legal review of new contract terms.' },
    ],
    relatedRecords: [],
    documents: [
      { name: 'salesforce_renewal_contract.pdf', size: '1.8 MB', type: 'PDF', uploadedBy: 'Procurement Officer Bob', uploadedDate: '2023-09-14' },
    ]
  },
  {
    id: 'TSM-REQ-005',
    title: 'Marketing Campaign Software License',
    description: 'Procurement of annual licenses for new marketing automation software (HubSpot Enterprise).',
    status: 'Approved',
    assignedTo: 'Procurement Officer Sarah',
    submittedBy: 'Michael Brown',
    submittedDate: '2023-10-05',
    dueDate: '2023-11-01',
    totalValue: '$60,000',
    category: 'Software',
    workflow: [
      { stage: 'Initiated', date: '2023-10-05', completed: true, sla: '5 days' },
      { stage: 'Manager Approval', date: '2023-10-06', completed: true, approver: 'Jane Doe' },
      { stage: 'Procurement Review', date: '2023-10-07', completed: true, sla: '3 days', reviewer: 'Sarah Connor' },
      { stage: 'PO Issued', date: '2023-10-10', completed: true },
      { stage: 'Software Deployed', date: '2023-10-15', completed: true },
    ],
    newsFeed: [
      { id: 'nf10', type: 'Status Update', user: 'Procurement Officer Sarah', timestamp: '2023-10-10 10:00', content: 'PO #TSM-PO-0100 Issued to HubSpot.' },
      { id: 'nf11', type: 'Comment', user: 'Michael Brown', timestamp: '2023-10-06 14:00', content: 'Looking forward to implementing this solution!' },
    ],
    relatedRecords: [],
    documents: [
      { name: 'hubspot_contract.pdf', size: '1.5 MB', type: 'PDF', uploadedBy: 'Procurement Officer Sarah', uploadedDate: '2023-10-09' },
    ]
  },
  {
    id: 'TSM-REQ-006',
    title: 'Office Furniture for New Floor',
    description: 'Bulk order for desks, chairs, and cabinets for the expansion to the 5th floor.',
    status: 'Pending',
    assignedTo: 'Procurement Officer Bob',
    submittedBy: 'Sarah Green',
    submittedDate: '2023-10-10',
    dueDate: '2023-12-01',
    totalValue: '$35,000',
    category: 'Office Supplies',
    workflow: [
      { stage: 'Initiated', date: '2023-10-10', completed: true, sla: '5 days' },
      { stage: 'Manager Approval', date: '2023-10-11', completed: true, approver: 'David King' },
      { stage: 'Procurement Review', date: '2023-10-12', completed: false, sla: '3 days', reviewer: 'Bob Smith' },
      { stage: 'RFQ Sent', date: null, completed: false, sla: '7 days' },
      { stage: 'Quote Evaluation', date: null, completed: false },
      { stage: 'PO Issued', date: null, completed: false },
      { stage: 'Delivered & Installed', date: null, completed: false },
    ],
    newsFeed: [
      { id: 'nf12', type: 'Comment', user: 'Sarah Green', timestamp: '2023-10-11 11:30', content: 'Please ensure ergonomic assessments are considered.' },
    ],
    relatedRecords: [],
    documents: [
      { name: 'floor_plan_furniture.pdf', size: '4.0 MB', type: 'PDF', uploadedBy: 'Sarah Green', uploadedDate: '2023-10-10' },
    ]
  },
  {
    id: 'TSM-REQ-007',
    title: 'IT Hardware Upgrade',
    description: 'Upgrade of server infrastructure and network equipment for enhanced performance.',
    status: 'Rejected',
    assignedTo: 'Procurement Officer Sarah',
    submittedBy: 'Tom Hiddleston',
    submittedDate: '2023-09-18',
    dueDate: '2023-11-15',
    totalValue: '$180,000',
    category: 'Hardware',
    workflow: [
      { stage: 'Initiated', date: '2023-09-18', completed: true, sla: '5 days' },
      { stage: 'Manager Approval', date: '2023-09-19', completed: true, approver: 'Jane Doe' },
      { stage: 'Procurement Review', date: '2023-09-20', completed: true, sla: '3 days', reviewer: 'Sarah Connor' },
      { stage: 'RFQ Sent', date: '2023-09-25', completed: true, sla: '7 days' },
      { stage: 'Quote Evaluation', date: '2023-10-01', completed: true },
      { stage: 'Budget Review', date: '2023-10-05', completed: false },
      { stage: 'Rejected', date: '2023-10-05', completed: true }, // Marked as rejected
    ],
    newsFeed: [
      { id: 'nf13', type: 'Alert', user: 'Finance Department', timestamp: '2023-10-05 14:00', content: 'Request TSM-REQ-007 rejected due to budget constraints. Re-evaluate scope.' },
      { id: 'nf14', type: 'Comment', user: 'Tom Hiddleston', timestamp: '2023-09-28 10:00', content: 'Received competitive quotes from vendors.' },
    ],
    relatedRecords: [],
    documents: [
      { name: 'server_specs.pdf', size: '2.8 MB', type: 'PDF', uploadedBy: 'Tom Hiddleston', uploadedDate: '2023-09-18' },
    ]
  },
  {
    id: 'TSM-REQ-008',
    title: 'External Training Program',
    description: 'Enrollment of 20 employees in an external project management certification program.',
    status: 'In Progress',
    assignedTo: 'Procurement Officer Bob',
    submittedBy: 'Olivia Black',
    submittedDate: '2023-10-03',
    dueDate: '2023-11-20',
    totalValue: '$10,000',
    category: 'Services',
    workflow: [
      { stage: 'Initiated', date: '2023-10-03', completed: true, sla: '5 days' },
      { stage: 'Manager Approval', date: '2023-10-04', completed: true, approver: 'John Doe' },
      { stage: 'Procurement Review', date: '2023-10-05', completed: true, sla: '3 days', reviewer: 'Bob Smith' },
      { stage: 'Vendor Selection', date: '2023-10-10', completed: false, sla: '7 days' },
      { stage: 'Contract Negotiation', date: null, completed: false },
      { stage: 'PO Issued', date: null, completed: false },
      { stage: 'Enrollment Confirmed', date: null, completed: false },
    ],
    newsFeed: [
      { id: 'nf15', type: 'Comment', user: 'Olivia Black', timestamp: '2023-10-06 09:00', content: 'Please look for providers offering hybrid learning options.' },
    ],
    relatedRecords: [],
    documents: [
      { name: 'training_program_details.docx', size: '0.8 MB', type: 'DOCX', uploadedBy: 'Olivia Black', uploadedDate: '2023-10-03' },
    ]
  },
  {
    id: 'TSM-REQ-009',
    title: 'Fleet Vehicle Lease Renewal',
    description: 'Renewal of lease agreements for 5 company fleet vehicles.',
    status: 'Pending',
    assignedTo: 'Procurement Officer Sarah',
    submittedBy: 'Robert Clark',
    submittedDate: '2023-09-05',
    dueDate: '2023-10-30',
    totalValue: '$45,000',
    category: 'Travel',
    workflow: [
      { stage: 'Initiated', date: '2023-09-05', completed: true, sla: '5 days' },
      { stage: 'Manager Approval', date: '2023-09-06', completed: true, approver: 'Mark Green' },
      { stage: 'Procurement Review', date: '2023-09-07', completed: true, sla: '3 days', reviewer: 'Sarah Connor' },
      { stage: 'Lease Options Reviewed', date: '2023-09-15', completed: true, sla: '7 days' },
      { stage: 'Negotiation with Vendor', date: '2023-09-25', completed: false, sla: '10 days' },
      { stage: 'Contract Signed', date: null, completed: false },
      { stage: 'Vehicles Delivered', date: null, completed: false },
    ],
    newsFeed: [
      { id: 'nf16', type: 'Comment', user: 'Procurement Officer Sarah', timestamp: '2023-09-25 15:00', content: 'Negotiating better terms with existing lease provider and evaluating new options.' },
      { id: 'nf17', type: 'Comment', user: 'Robert Clark', timestamp: '2023-09-10 10:00', content: 'Consider electric vehicle options for renewals.' },
    ],
    relatedRecords: [],
    documents: [
      { name: 'fleet_lease_agreement.pdf', size: '0.9 MB', type: 'PDF', uploadedBy: 'Robert Clark', uploadedDate: '2023-09-05' },
    ]
  },
];

const mockInventoryItems = [
  {
    id: 'INV-001',
    name: 'Standard Office Chair',
    description: 'Ergonomic office chair with adjustable height and lumbar support.',
    category: 'Furniture',
    quantity: 50,
    unitCost: 150.00,
    supplier: 'Office Furniture Co.',
    lastUpdated: '2023-10-25',
    status: 'In Stock',
  },
  {
    id: 'INV-002',
    name: 'USB-C Docking Station',
    description: 'Universal docking station for laptops with multiple ports.',
    category: 'Electronics',
    quantity: 12,
    unitCost: 85.00,
    supplier: 'Tech Solutions Inc.',
    lastUpdated: '2023-10-24',
    status: 'Low Stock',
  },
  {
    id: 'INV-003',
    name: 'A4 Printer Paper (Box)',
    description: 'Box of 5 reams of standard A4 printer paper.',
    category: 'Consumables',
    quantity: 5,
    unitCost: 25.00,
    supplier: 'Global Supplies',
    lastUpdated: '2023-10-23',
    status: 'Out of Stock',
  },
  {
    id: 'INV-004',
    name: 'Wireless Keyboard & Mouse Combo',
    description: 'Ergonomic wireless keyboard and mouse set.',
    category: 'Peripherals',
    quantity: 30,
    unitCost: 45.00,
    supplier: 'Tech Solutions Inc.',
    lastUpdated: '2023-10-26',
    status: 'In Stock',
  },
  {
    id: 'INV-005',
    name: 'Projector Lamp (Replacement)',
    description: 'Replacement lamp for meeting room projectors.',
    category: 'Maintenance',
    quantity: 2,
    unitCost: 120.00,
    supplier: 'AV Experts',
    lastUpdated: '2023-10-20',
    status: 'Low Stock',
  },
];

// --- Screens ---

const DashboardScreen = ({ userRole, capabilities, navigateTo }) => {
  const [kpis, setKpis] = useState(mockDashboardData.kpis);
  const [recentActivities, setRecentActivities] = useState(mockDashboardData.recentActivities);

  useEffect(() => {
    // Simulate real-time updates for KPIs and activities
    const kpiInterval = setInterval(() => {
      setKpis(prevKpis => prevKpis.map(kpi => ({
        ...kpi,
        value: kpi.id === 'openRFQs' ? (parseInt(kpi.value) + (Math.random() > 0.5 ? 1 : -1)).toString() : kpi.value, // Example dynamic update
        // A real app would fetch new data
      })));
    }, 15000); // Update every 15 seconds

    const activityInterval = setInterval(() => {
      setRecentActivities(prevActivities => {
        const newActivity = {
          id: `act-${Date.now()}`,
          type: 'System Update',
          description: `Spend data refreshed. Total spend: $${(Math.random() * 1000 + 100).toFixed(0)}k`,
          user: 'System',
          time: 'just now',
        };
        return [newActivity, ...prevActivities.slice(0, 4)]; // Keep last 5 activities
      });
    }, 20000); // Update every 20 seconds

    return () => {
      clearInterval(kpiInterval);
      clearInterval(activityInterval);
    };
  }, []);

  return (
    <div className="full-screen-page">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        {capabilities.canInitiateRequest && (
          <Button onClick={() => navigateTo('CREATE_REQUEST')}><Icon name="plus" color="var(--color-white)" size={16} style={{ marginRight: 'var(--spacing-xs)' }} /> New Request</Button>
        )}
      </div>

      <div className="dashboard-grid">
        {kpis.map(kpi => (
          <Card key={kpi.id} className="dashboard-overview-card" style={{ borderColor: kpi.color, borderLeftWidth: '5px' }}>
            <div className="flex-between">
              <h3>{kpi.title}</h3>
              {kpi.icon && <Icon name={kpi.icon} size={24} color={kpi.color} />}
            </div>
            <p className="kpi-value">{kpi.value}</p>
            {kpi.trend && (
              <div className={`kpi-trend ${kpi.trend === 'up' ? 'positive' : 'negative'}`}>
                <Icon name={kpi.trend === 'up' ? 'trendingUp' : 'trendingDown'} size={16} />
                <span>{kpi.percentage} {kpi.trend === 'up' ? 'increase' : 'decrease'}</span>
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="dashboard-grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <ChartComponent type="Bar" title="Spend by Category" label="Spend by Category" data={mockDashboardData.spendByCategory} />
        <ChartComponent type="Line" title="Open RFQs Trend" label="Open RFQs Trend" data={mockDashboardData.openRFQsTrend} />
      </div>

      <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <ChartComponent type="Donut" title="Procurement Status Overview" label="Procurement Status Overview" data={[]} />
        <Card className="scrollable-y" style={{ maxHeight: '400px' }}>
          <h4>Recent Activities <Icon name="activity" color="var(--text-secondary)" size={18} /></h4>
          <div style={{ paddingRight: 'var(--spacing-sm)' }}> {/* Account for scrollbar */}
            {recentActivities.map(activity => (
              <div key={activity.id} className="audit-feed-item">
                <div className="audit-feed-icon">
                  <Icon name={activity.type === 'Approval' ? 'checkCircle' : activity.type === 'Alert' ? 'xCircle' : 'info'} size={18} />
                </div>
                <div className="audit-feed-content">
                  <strong>{activity.description}</strong>
                  <div className="audit-feed-meta">{activity.user} &bull; {activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

    </div>
  );
};

const RecordsScreen = ({ userRole, capabilities, navigateTo }) => {
  const [records, setRecords] = useState(mockProcurementRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [filters, setFilters] = useState({ status: '', category: '', assignedTo: '' });
  const [showEmptyState, setShowEmptyState] = useState(false);

  // Mock search and filter logic
  const filteredRecords = records.filter(record => {
    const matchesSearch = searchTerm ? Object.values(record).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    ) : true;
    const matchesStatus = filters.status ? record.status === filters.status : true;
    const matchesCategory = filters.category ? record.category === filters.category : true;
    const matchesAssignedTo = filters.assignedTo ? record.assignedTo === filters.assignedTo : true;
    return matchesSearch && matchesStatus && matchesCategory && matchesAssignedTo;
  });

  useEffect(() => {
    // Simulate initial data load or permission check for empty state
    if (records.length === 0 && capabilities.canInitiateRequest) {
      setShowEmptyState(true);
    } else {
      setShowEmptyState(false);
    }
  }, [records, capabilities]);

  const handleFilterChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const applyFilters = () => {
    // In a real app, this would trigger a data fetch
    console.log('Applying filters:', filters);
    setFilterPanelOpen(false);
  };

  const clearFilters = () => {
    setFilters({ status: '', category: '', assignedTo: '' });
    // In a real app, this would trigger a data fetch
    console.log('Clearing filters');
    setFilterPanelOpen(false);
  };

  const handleCreateRequest = useCallback(() => {
    navigateTo('CREATE_REQUEST');
  }, [navigateTo]);

  return (
    <div className="full-screen-page">
      <div className="page-header">
        <h1 className="page-title">Procurement Requests</h1>
        <div className="flex-gap-md">
          <Input
            type="text"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="global-search-input"
            style={{ width: '250px' }} // Override to prevent full-width
          />
          <Button variant="secondary" onClick={() => setFilterPanelOpen(true)}>
            <Icon name="filter" size={16} style={{ marginRight: 'var(--spacing-xs)' }} /> Filters
          </Button>
          {capabilities.canExportData && (
            <Button variant="secondary" onClick={() => alert('Exporting data...')}>
              <Icon name="fileText" size={16} style={{ marginRight: 'var(--spacing-xs)' }} /> Export
            </Button>
          )}
          {capabilities.canInitiateRequest && (
            <Button onClick={handleCreateRequest}><Icon name="plus" color="var(--color-white)" size={16} style={{ marginRight: 'var(--spacing-xs)' }} /> New Request</Button>
          )}
        </div>
      </div>

      {showEmptyState ? (
        <EmptyState
          icon="clipboard"
          title="No Procurement Requests Found"
          message="It looks like there are no procurement requests to display. Start by creating a new one."
          callToAction="Create New Request"
          onAction={handleCreateRequest}
        />
      ) : (
        <div className="card-grid">
          {filteredRecords.map(request => (
            <Card
              key={request.id}
              onClick={() => navigateTo('DETAIL_VIEW', { id: request.id })}
              style={{ borderColor: `var(--status-${request.status?.toLowerCase().replace(/\s/g, '-')}-border, var(--border-color))` }}
            >
              <div className="flex-between" style={{ marginBottom: 'var(--spacing-sm)' }}>
                <h3 style={{ margin: 0, fontSize: 'var(--font-size-md)' }}>{request.title}</h3>
                <StatusTag status={request.status} />
              </div>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>{request.description?.substring(0, 100)}...</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>
                <span>ID: <strong>{request.id}</strong></span>
                <span>Value: <strong>{request.totalValue}</strong></span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--spacing-xs)', fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                <span>Submitted: {request.submittedDate}</span>
                <span>Due: {request.dueDate}</span>
              </div>
              {/* Hover actions could be implemented here as an absolute positioned div */}
            </Card>
          ))}
        </div>
      )}

      <div className={`filter-panel ${filterPanelOpen ? 'open' : ''}`}>
        <div className="filter-panel-header">
          <h3>Filters</h3>
          <button className="close-button" onClick={() => setFilterPanelOpen(false)}>&times;</button>
        </div>
        <div className="filter-panel-content">
          <Select
            label="Status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            options={[
              { value: 'Approved', label: 'Approved' },
              { value: 'In Progress', label: 'In Progress' },
              { value: 'Pending', label: 'Pending Approval' },
              { value: 'Rejected', label: 'Rejected' },
              { value: 'Exception', label: 'Exception' },
            ]}
          />
          <Input
            label="Category"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            placeholder="e.g., Hardware, Software"
          />
          <Input
            label="Assigned To"
            name="assignedTo"
            value={filters.assignedTo}
            onChange={handleFilterChange}
            placeholder="e.g., Procurement Officer Bob"
          />
          {/* More filter options */}
        </div>
        <div className="filter-panel-actions">
          <Button variant="secondary" onClick={clearFilters} className="full-width">Clear Filters</Button>
          <Button onClick={applyFilters} className="full-width">Apply Filters</Button>
        </div>
      </div>
      <div className={`overlay ${filterPanelOpen ? 'open' : ''}`} onClick={() => setFilterPanelOpen(false)}></div>
    </div>
  );
};

const RecordDetailScreen = ({ recordId, navigateTo, userRole, capabilities }) => {
  const record = mockProcurementRequests.find(r => r.id === recordId);

  if (!record) {
    return (
      <div className="full-screen-page">
        <Breadcrumbs path={[{ label: 'Requests', onClick: () => navigateTo('RECORDS') }, { label: 'Not Found' }]} />
        <EmptyState
          icon="xCircle"
          title="Record Not Found"
          message={`The procurement request with ID "${recordId}" could not be found.`}
          callToAction="Back to Requests"
          onAction={() => navigateTo('RECORDS')}
        />
      </div>
    );
  }

  const breadcrumbsPath = [
    { label: 'Dashboard', onClick: () => navigateTo('DASHBOARD') },
    { label: 'Procurement Requests', onClick: () => navigateTo('RECORDS') },
    { label: record.id },
  ];

  const currentWorkflowIndex = record.workflow?.findIndex(stage => !stage.completed);
  const currentStage = currentWorkflowIndex !== -1 ? record.workflow[currentWorkflowIndex]?.stage : record.workflow?.[record.workflow.length - 1]?.stage;

  // RBAC for actions on detail view
  const canApprove = capabilities.canApprove && (userRole === 'Procurement Officer'); // Example for specific role
  const canEdit = capabilities.canInlineEdit || capabilities.canInitiateRequest; // Broader edit permissions

  const handleEdit = () => {
    alert(`Editing record ${recordId}`);
    // navigateTo('EDIT_RECORD', { id: recordId });
  };

  const handleApprove = () => {
    if (confirm(`Are you sure you want to approve ${record.title}?`)) {
      alert(`Record ${recordId} Approved!`);
      // Update local state or call API
    }
  };

  const handleReject = () => {
    if (confirm(`Are you sure you want to reject ${record.title}?`)) {
      alert(`Record ${recordId} Rejected.`);
      // Update local state or call API
    }
  };


  return (
    <div className="full-screen-page">
      <Breadcrumbs path={breadcrumbsPath} />
      <div className="page-header">
        <h1 className="page-title">{record.title}</h1>
        <div className="flex-gap-md">
          <StatusTag status={record.status} />
          {canEdit && <Button variant="secondary" onClick={handleEdit}>Edit</Button>}
          {canApprove && record.status === 'Pending' && <Button onClick={handleApprove}>Approve</Button>}
          {canApprove && record.status === 'Pending' && <Button variant="danger" onClick={handleReject}>Reject</Button>}
        </div>
      </div>

      <Card className="mb-lg p-xl">
        <h4>Workflow Progress</h4>
        <div className="milestone-tracker">
          {record.workflow?.map((step, index) => (
            <div
              key={step.stage}
              className={`milestone-step ${step.completed ? 'completed' : ''} ${step.stage === currentStage ? 'current' : ''}`}
            >
              <div className="milestone-icon">
                {step.completed ? <Icon name="checkCircle" size={16} color="var(--color-white)" /> : index + 1}
              </div>
              <div className="milestone-label">{step.stage}</div>
              {step.slaBreached && (
                <div style={{ position: 'absolute', top: '50px', fontSize: 'var(--font-size-xs)', color: 'var(--color-danger)' }}>
                  SLA Breached!
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="detail-summary-grid">
        <div>
          <div className="detail-section">
            <h4>Summary</h4>
            <div className="detail-item">
              <span className="detail-item-label">Request ID</span>
              <span className="detail-item-value">{record.id}</span>
            </div>
            <div className="detail-item">
              <span className="detail-item-label">Description</span>
              <span className="detail-item-value text-right" style={{ maxWidth: '70%' }}>{record.description}</span>
            </div>
            <div className="detail-item">
              <span className="detail-item-label">Submitted By</span>
              <span className="detail-item-value">{record.submittedBy}</span>
            </div>
            <div className="detail-item">
              <span className="detail-item-label">Submitted Date</span>
              <span className="detail-item-value">{record.submittedDate}</span>
            </div>
            <div className="detail-item">
              <span className="detail-item-label">Due Date</span>
              <span className="detail-item-value">{record.dueDate}</span>
            </div>
            <div className="detail-item">
              <span className="detail-item-label">Total Value</span>
              <span className="detail-item-value">{record.totalValue}</span>
            </div>
            <div className="detail-item">
              <span className="detail-item-label">Category</span>
              <span className="detail-item-value">{record.category}</span>
            </div>
            <div className="detail-item">
              <span className="detail-item-label">Assigned To</span>
              <span className="detail-item-value">{record.assignedTo}</span>
            </div>
          </div>

          {record.relatedRecords?.length > 0 && (
            <div className="detail-section">
              <h4>Related Records</h4>
              {record.relatedRecords.map(rel => (
                <div key={rel.id} className="detail-item" style={{ cursor: 'pointer' }} onClick={() => alert(`Navigating to ${rel.type} ${rel.id}`)}>
                  <span className="detail-item-label">{rel.type}: {rel.name}</span>
                  <span className="detail-item-value"><StatusTag status={rel.status} /> <Icon name="chevronRight" size={16} color="var(--text-muted)" /></span>
                </div>
              ))}
            </div>
          )}

          {record.documents?.length > 0 && (
            <div className="detail-section">
              <h4>Documents</h4>
              {record.documents.map(doc => (
                <div key={doc.name} className="detail-item" style={{ cursor: 'pointer' }} onClick={() => alert(`Previewing ${doc.name}`)}>
                  <span className="detail-item-label">
                    <Icon name="fileText" size={16} color="var(--text-secondary)" style={{ marginRight: 'var(--spacing-xs)' }} />
                    {doc.name}
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>{doc.size} &bull; {doc.uploadedDate}</div>
                  </span>
                  <span className="detail-item-value"><Icon name="chevronRight" size={16} color="var(--text-muted)" /></span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="detail-section">
            <h4>News / Audit Feed</h4>
            <div className="scrollable-y" style={{ maxHeight: '600px', paddingRight: 'var(--spacing-sm)' }}>
              {record.newsFeed?.map(feedItem => (
                <div key={feedItem.id} className="audit-feed-item">
                  <div className="audit-feed-icon">
                    <Icon name={feedItem.type === 'Alert' ? 'xCircle' : feedItem.type === 'Status Update' ? 'activity' : 'info'} size={18} />
                  </div>
                  <div className="audit-feed-content">
                    <strong>{feedItem.content}</strong>
                    <div className="audit-feed-meta">{feedItem.user} &bull; {feedItem.timestamp}</div>
                  </div>
                </div>
              ))}
              {record.newsFeed?.length === 0 && (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>No recent activity for this record.</p>
              )}
            </div>
            {/* Add comment/activity input here for Business User/Procurement Officer */}
          </div>

          {capabilities.canViewAuditLogs && (
            <div className="detail-section">
              <h4>Audit Logs (Role-Based Visibility)</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)' }}>
                [Conceptual: Immutable audit trail with detailed changes and timestamps, visible based on {userRole} role permissions.]
              </p>
              {/* Actual audit logs would be a list similar to news feed but more technical */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CreateRequestFormScreen = ({ navigateTo, userRole, capabilities }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    totalValue: '',
    dueDate: '',
    attachments: [],
    errors: {}, // For field-level validations
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value, errors: { ...prev.errors, [name]: '' } }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...Array.from(e.target.files)],
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is mandatory.';
    if (!formData.description) newErrors.description = 'Description is mandatory.';
    if (!formData.category) newErrors.category = 'Category is mandatory.';
    if (!formData.totalValue || isNaN(formData.totalValue) || parseFloat(formData.totalValue) <= 0) newErrors.totalValue = 'Valid total value is mandatory.';
    if (!formData.dueDate) newErrors.dueDate = 'Due Date is mandatory.';
    setFormData(prev => ({ ...prev, errors: newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Request Submitted Successfully! (See console for data)');
      console.log('Form Data:', formData);
      // In a real app, this would send data to an API
      navigateTo('RECORDS'); // Go back to records list after submission
    } else {
      alert('Please correct the errors in the form.');
    }
  };

  return (
    <div className="full-screen-page">
      <Breadcrumbs path={[{ label: 'Requests', onClick: () => navigateTo('RECORDS') }, { label: 'New Request' }]} />
      <div className="page-header">
        <h1 className="page-title">Create New Procurement Request</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <Input
            label="Request Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., New Laptops for Marketing Team"
            required
            error={formData.errors.title}
          />
          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide a detailed description of your procurement needs."
            required
            error={formData.errors.description}
          />
          <Select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            error={formData.errors.category}
            options={[
              { value: 'Hardware', label: 'Hardware' },
              { value: 'Software', label: 'Software' },
              { value: 'Services', label: 'Services' },
              { value: 'Office Supplies', label: 'Office Supplies' },
              { value: 'Travel', label: 'Travel' },
            ]}
          />
          <Input
            label="Estimated Total Value ($)"
            type="number"
            name="totalValue"
            value={formData.totalValue}
            onChange={handleChange}
            placeholder="e.g., 15000"
            required
            error={formData.errors.totalValue}
          />
          <Input
            label="Required By Date"
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
            error={formData.errors.dueDate}
          />
          <FileUpload
            label="Attachments (e.g., specifications, scope of work)"
            name="attachments"
            onFileChange={handleFileChange}
          />
          {formData.attachments?.length > 0 && (
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>Uploaded files:</p>
              <ul>
                {formData.attachments.map((file, index) => (
                  <li key={index} style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="form-actions">
            <Button type="submit">Submit Request</Button>
            <Button variant="secondary" onClick={() => navigateTo('RECORDS')}>Cancel</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};


const InventoryScreen = ({ userRole, capabilities, navigateTo }) => {
  const [inventoryItems, setInventoryItems] = useState(mockInventoryItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [filters, setFilters] = useState({ status: '', category: '', supplier: '' });
  const [showEmptyState, setShowEmptyState] = useState(false);

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = searchTerm ? Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    ) : true;
    const matchesStatus = filters.status ? item.status === filters.status : true;
    const matchesCategory = filters.category ? item.category === filters.category : true;
    const matchesSupplier = filters.supplier ? item.supplier === filters.supplier : true;
    return matchesSearch && matchesStatus && matchesCategory && matchesSupplier;
  });

  useEffect(() => {
    if (inventoryItems.length === 0 && capabilities.canCreateInventoryItem) {
      setShowEmptyState(true);
    } else {
      setShowEmptyState(false);
    }
  }, [inventoryItems, capabilities]);

  const handleFilterChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const applyFilters = () => {
    console.log('Applying inventory filters:', filters);
    setFilterPanelOpen(false);
  };

  const clearFilters = () => {
    setFilters({ status: '', category: '', supplier: '' });
    console.log('Clearing inventory filters');
    setFilterPanelOpen(false);
  };

  const handleCreateInventoryItem = useCallback(() => {
    navigateTo('CREATE_INVENTORY_ITEM');
  }, [navigateTo]);

  return (
    <div className="full-screen-page">
      <div className="page-header">
        <h1 className="page-title">Inventory Management</h1>
        <div className="flex-gap-md">
          <Input
            type="text"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="global-search-input"
            style={{ width: '250px' }}
          />
          <Button variant="secondary" onClick={() => setFilterPanelOpen(true)}>
            <Icon name="filter" size={16} style={{ marginRight: 'var(--spacing-xs)' }} /> Filters
          </Button>
          {capabilities.canCreateInventoryItem && (
            <Button onClick={handleCreateInventoryItem}><Icon name="plus" color="var(--color-white)" size={16} style={{ marginRight: 'var(--spacing-xs)' }} /> Add Item</Button>
          )}
        </div>
      </div>

      {showEmptyState ? (
        <EmptyState
          icon="package"
          title="No Inventory Items Found"
          message="It looks like there are no inventory items to display. Add new items to get started."
          callToAction="Add New Inventory Item"
          onAction={handleCreateInventoryItem}
        />
      ) : (
        <div className="card-grid">
          {filteredItems.map(item => (
            <Card
              key={item.id}
              onClick={() => navigateTo('INVENTORY_DETAIL_VIEW', { id: item.id })}
              style={{ borderColor: `var(--status-${item.status?.toLowerCase().replace(/\s/g, '-')}-border, var(--border-color))` }}
            >
              <div className="flex-between" style={{ marginBottom: 'var(--spacing-sm)' }}>
                <h3 style={{ margin: 0, fontSize: 'var(--font-size-md)' }}>{item.name}</h3>
                <StatusTag status={item.status} />
              </div>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>{item.description?.substring(0, 100)}...</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>
                <span>ID: <strong>{item.id}</strong></span>
                <span>Qty: <strong>{item.quantity}</strong></span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--spacing-xs)', fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                <span>Category: {item.category}</span>
                <span>Supplier: {item.supplier}</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className={`filter-panel ${filterPanelOpen ? 'open' : ''}`}>
        <div className="filter-panel-header">
          <h3>Inventory Filters</h3>
          <button className="close-button" onClick={() => setFilterPanelOpen(false)}>&times;</button>
        </div>
        <div className="filter-panel-content">
          <Select
            label="Status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            options={[
              { value: 'In Stock', label: 'In Stock' },
              { value: 'Low Stock', label: 'Low Stock' },
              { value: 'Out of Stock', label: 'Out of Stock' },
            ]}
          />
          <Input
            label="Category"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            placeholder="e.g., Electronics, Furniture"
          />
          <Input
            label="Supplier"
            name="supplier"
            value={filters.supplier}
            onChange={handleFilterChange}
            placeholder="e.g., Tech Solutions Inc."
          />
        </div>
        <div className="filter-panel-actions">
          <Button variant="secondary" onClick={clearFilters} className="full-width">Clear Filters</Button>
          <Button onClick={applyFilters} className="full-width">Apply Filters</Button>
        </div>
      </div>
      <div className={`overlay ${filterPanelOpen ? 'open' : ''}`} onClick={() => setFilterPanelOpen(false)}></div>
    </div>
  );
};


const InventoryDetailScreen = ({ itemId, navigateTo, userRole, capabilities }) => {
  const item = mockInventoryItems.find(i => i.id === itemId);

  if (!item) {
    return (
      <div className="full-screen-page">
        <Breadcrumbs path={[{ label: 'Inventory', onClick: () => navigateTo('INVENTORY') }, { label: 'Not Found' }]} />
        <EmptyState
          icon="xCircle"
          title="Item Not Found"
          message={`The inventory item with ID "${itemId}" could not be found.`}
          callToAction="Back to Inventory"
          onAction={() => navigateTo('INVENTORY')}
        />
      </div>
    );
  }

  const breadcrumbsPath = [
    { label: 'Dashboard', onClick: () => navigateTo('DASHBOARD') },
    { label: 'Inventory', onClick: () => navigateTo('INVENTORY') },
    { label: item.id },
  ];

  const canEditItem = capabilities.canEditInventoryItem;

  const handleEdit = () => {
    alert(`Editing inventory item ${itemId}`);
    // In a real app, navigate to an edit form
  };

  return (
    <div className="full-screen-page">
      <Breadcrumbs path={breadcrumbsPath} />
      <div className="page-header">
        <h1 className="page-title">{item.name}</h1>
        <div className="flex-gap-md">
          <StatusTag status={item.status} />
          {canEditItem && <Button variant="secondary" onClick={handleEdit}>Edit Item</Button>}
        </div>
      </div>

      <div className="detail-summary-grid">
        <div>
          <div className="detail-section">
            <h4>Item Details</h4>
            <div className="detail-item">
              <span className="detail-item-label">Item ID</span>
              <span className="detail-item-value">{item.id}</span>
            </div>
            <div className="detail-item">
              <span className="detail-item-label">Description</span>
              <span className="detail-item-value text-right" style={{ maxWidth: '70%' }}>{item.description}</span>
            </div>
            <div className="detail-item">
              <span className="detail-item-label">Category</span>
              <span className="detail-item-value">{item.category}</span>
            </div>
            <div className="detail-item">
              <span className="detail-item-label">Quantity in Stock</span>
              <span className="detail-item-value">{item.quantity} units</span>
            </div>
            <div className="detail-item">
              <span className="detail-item-label">Unit Cost</span>
              <span className="detail-item-value">${item.unitCost?.toFixed(2)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-item-label">Total Value</span>
              <span className="detail-item-value">${(item.quantity * item.unitCost)?.toFixed(2)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-item-label">Supplier</span>
              <span className="detail-item-value">{item.supplier}</span>
            </div>
            <div className="detail-item">
              <span className="detail-item-label">Last Updated</span>
              <span className="detail-item-value">{item.lastUpdated}</span>
            </div>
          </div>
        </div>
        <div>
          <div className="detail-section">
            <h4>Inventory Movement History</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)' }}>
              [Conceptual: Display a log of stock additions, removals, and adjustments.]
            </p>
            <div className="audit-feed-item">
              <div className="audit-feed-icon">
                <Icon name="plus" size={18} />
              </div>
              <div className="audit-feed-content">
                <strong>Added 10 units to stock.</strong>
                <div className="audit-feed-meta">Procurement Officer Bob &bull; 2023-10-25</div>
              </div>
            </div>
            <div className="audit-feed-item">
              <div className="audit-feed-icon">
                <Icon name="package" size={18} />
              </div>
              <div className="audit-feed-content">
                <strong>Issued 2 units for Marketing Dept.</strong>
                <div className="audit-feed-meta">Alice Johnson &bull; 2023-10-26</div>
              </div>
            </div>
          </div>
          {capabilities.canViewAuditLogs && (
            <div className="detail-section">
              <h4>Audit Logs (Role-Based Visibility)</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)' }}>
                [Conceptual: Immutable audit trail with detailed changes and timestamps, visible based on {userRole} role permissions.]
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CreateInventoryItemScreen = ({ navigateTo, userRole, capabilities }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    quantity: '',
    unitCost: '',
    supplier: '',
    errors: {},
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value, errors: { ...prev.errors, [name]: '' } }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Item name is mandatory.';
    if (!formData.description) newErrors.description = 'Description is mandatory.';
    if (!formData.category) newErrors.category = 'Category is mandatory.';
    if (!formData.quantity || isNaN(formData.quantity) || parseInt(formData.quantity) <= 0) newErrors.quantity = 'Valid quantity is mandatory.';
    if (!formData.unitCost || isNaN(formData.unitCost) || parseFloat(formData.unitCost) <= 0) newErrors.unitCost = 'Valid unit cost is mandatory.';
    if (!formData.supplier) newErrors.supplier = 'Supplier is mandatory.';
    setFormData(prev => ({ ...prev, errors: newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Inventory Item Added Successfully! (See console for data)');
      console.log('New Inventory Item Data:', formData);
      // In a real app, this would send data to an API
      navigateTo('INVENTORY');
    } else {
      alert('Please correct the errors in the form.');
    }
  };

  return (
    <div className="full-screen-page">
      <Breadcrumbs path={[{ label: 'Inventory', onClick: () => navigateTo('INVENTORY') }, { label: 'Add Item' }]} />
      <div className="page-header">
        <h1 className="page-title">Add New Inventory Item</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <Input
            label="Item Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Ergonomic Office Chair"
            required
            error={formData.errors.name}
          />
          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Detailed description of the item."
            required
            error={formData.errors.description}
          />
          <Select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            error={formData.errors.category}
            options={[
              { value: 'Furniture', label: 'Furniture' },
              { value: 'Electronics', label: 'Electronics' },
              { value: 'Consumables', label: 'Consumables' },
              { value: 'Peripherals', label: 'Peripherals' },
              { value: 'Maintenance', label: 'Maintenance' },
            ]}
          />
          <Input
            label="Quantity in Stock"
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="e.g., 50"
            required
            error={formData.errors.quantity}
          />
          <Input
            label="Unit Cost ($)"
            type="number"
            name="unitCost"
            value={formData.unitCost}
            onChange={handleChange}
            placeholder="e.g., 150.00"
            step="0.01"
            required
            error={formData.errors.unitCost}
          />
          <Input
            label="Supplier"
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
            placeholder="e.g., Office Furniture Co."
            required
            error={formData.errors.supplier}
          />

          <div className="form-actions">
            <Button type="submit">Add Item</Button>
            <Button variant="secondary" onClick={() => navigateTo('INVENTORY')}>Cancel</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};


// --- Main App Component ---
function App() {
  const [view, setView] = useState({ screen: 'DASHBOARD', params: {} });
  const [userRole, setUserRole] = useState('Procurement Officer'); // Default role
  const capabilities = ROLES[userRole] || {}; // Get capabilities based on role
  const [showGlobalSearch, setShowGlobalSearch] = useState(false);
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');

  // Simulating user login/role change
  useEffect(() => {
    // In a real app, this would be fetched from auth context
    console.log(`Current user role: ${userRole}. Capabilities:`, capabilities);
  }, [userRole, capabilities]);

  const navigateTo = useCallback((screen, params = {}) => {
    setView({ screen, params });
    // Close any open side panels or modals when navigating
    // setShowFilterPanel(false); // If a global filter panel was open
  }, []);

  const handleGlobalSearch = (e) => {
    e.preventDefault();
    if (globalSearchTerm.trim()) {
      alert(`Global Search for: "${globalSearchTerm}"`);
      // In a real app, this would navigate to a global search results page
      // navigateTo('SEARCH_RESULTS', { query: globalSearchTerm });
    }
  };

  const renderScreen = () => {
    switch (view.screen) {
      case 'DASHBOARD':
        return <DashboardScreen userRole={userRole} capabilities={capabilities} navigateTo={navigateTo} />;
      case 'RECORDS':
        return <RecordsScreen userRole={userRole} capabilities={capabilities} navigateTo={navigateTo} />;
      case 'DETAIL_VIEW':
        return <RecordDetailScreen recordId={view.params.id} userRole={userRole} capabilities={capabilities} navigateTo={navigateTo} />;
      case 'CREATE_REQUEST':
        return capabilities.canInitiateRequest ? <CreateRequestFormScreen userRole={userRole} capabilities={capabilities} navigateTo={navigateTo} /> : <EmptyState icon="xCircle" title="Access Denied" message="You do not have permission to create requests." onAction={() => navigateTo('DASHBOARD')} callToAction="Go to Dashboard"/>;
      case 'INVENTORY':
        return capabilities.canViewInventory ? <InventoryScreen userRole={userRole} capabilities={capabilities} navigateTo={navigateTo} /> : <EmptyState icon="xCircle" title="Access Denied" message="You do not have permission to view inventory." onAction={() => navigateTo('DASHBOARD')} callToAction="Go to Dashboard"/>;
      case 'INVENTORY_DETAIL_VIEW':
        return capabilities.canViewInventory ? <InventoryDetailScreen itemId={view.params.id} userRole={userRole} capabilities={capabilities} navigateTo={navigateTo} /> : <EmptyState icon="xCircle" title="Access Denied" message="You do not have permission to view this inventory item." onAction={() => navigateTo('INVENTORY')} callToAction="Back to Inventory"/>;
      case 'CREATE_INVENTORY_ITEM':
        return capabilities.canCreateInventoryItem ? <CreateInventoryItemScreen userRole={userRole} capabilities={capabilities} navigateTo={navigateTo} /> : <EmptyState icon="xCircle" title="Access Denied" message="You do not have permission to create inventory items." onAction={() => navigateTo('INVENTORY')} callToAction="Back to Inventory"/>;
      default:
        return <DashboardScreen userRole={userRole} capabilities={capabilities} navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo" onClick={() => navigateTo('DASHBOARD')} style={{ cursor: 'pointer' }}>Tailspend Management</div>
        <nav style={{ display: 'flex', alignItems: 'center' }}>
          <form onSubmit={handleGlobalSearch} style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <Input
              type="text"
              placeholder="Global Search..."
              value={globalSearchTerm}
              onChange={(e) => setGlobalSearchTerm(e.target.value)}
              onFocus={() => setShowGlobalSearch(true)}
              onBlur={() => setShowGlobalSearch(false)}
              className="global-search-input"
              style={{ paddingLeft: 'var(--spacing-xl)', transition: 'width 0.3s ease' }}
            />
            <div style={{ position: 'absolute', left: 'var(--spacing-md)', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
              <Icon name="search" size={16} color="var(--text-muted)" />
            </div>
          </form>
          {capabilities.canViewDashboard && (
            <span className="nav-link" onClick={() => navigateTo('DASHBOARD')}>
              <Icon name="dashboard" size={16} style={{ marginRight: 'var(--spacing-xs)' }} /> Dashboard
            </span>
          )}
          {(capabilities.canViewAllRequests || capabilities.canViewOwnRequests) && (
            <span className="nav-link" onClick={() => navigateTo('RECORDS')}>
              <Icon name="requests" size={16} style={{ marginRight: 'var(--spacing-xs)' }} /> Requests
            </span>
          )}
          {capabilities.canViewInventory && (
            <span className="nav-link" onClick={() => navigateTo('INVENTORY')}>
              <Icon name="package" size={16} style={{ marginRight: 'var(--spacing-xs)' }} /> Inventory
            </span>
          )}
          <div className="nav-link" onClick={() => setUserRole(userRole === 'Procurement Officer' ? 'Business User' : 'Procurement Officer')} style={{marginLeft: 'var(--spacing-lg)'}}>
            <Icon name="user" size={16} style={{ marginRight: 'var(--spacing-xs)' }} /> {userRole} (Click to change role)
          </div>
        </nav>
      </header>

      <main className="main-content">
        {renderScreen()}
      </main>
    </div>
  );
}

export default App;