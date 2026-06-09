import React from 'react';
import { NotificationCategory, NotificationItemData } from '../types';
import {
  BellOutlined,
  ShoppingOutlined,
  GiftOutlined,
  SettingOutlined,
} from '@ant-design/icons';

interface NotificationSidebarProps {
  activeTab: NotificationCategory;
  onTabChange: (tab: NotificationCategory) => void;
  notifications: NotificationItemData[];
}

const NotificationSidebar: React.FC<NotificationSidebarProps> = ({
  activeTab,
  onTabChange,
  notifications,
}) => {
  const getUnreadCount = (category: NotificationCategory) => {
    if (category === 'ALL') {
      return notifications.filter((n) => !n.isRead).length;
    }
    return notifications.filter((n) => n.category === category && !n.isRead).length;
  };

  const tabs: {
    key: NotificationCategory;
    label: string;
    shortLabel: string;
    icon: React.ReactNode;
    desc: string;
  }[] = [
    { key: 'ALL', label: 'Tất cả thông báo', shortLabel: 'Tất cả', icon: <BellOutlined />, desc: 'Toàn bộ thông tin từ Lunaria' },
    { key: 'ORDER', label: 'Đơn hàng', shortLabel: 'Đơn hàng', icon: <ShoppingOutlined />, desc: 'Cập nhật trạng thái đơn hàng' },
    { key: 'PROMOTION', label: 'Khuyến mãi & Voucher', shortLabel: 'Khuyến mãi', icon: <GiftOutlined />, desc: 'Ưu đãi, mã giảm giá độc quyền' },
    { key: 'SYSTEM', label: 'Cập nhật hệ thống', shortLabel: 'Hệ thống', icon: <SettingOutlined />, desc: 'Tin tức và bảo trì hệ thống' },
  ];

  return (
    <div className="notification-sidebar">
      <div className="sidebar-header">
        <h3>Trung tâm thông báo</h3>
        <p>Quản lý và theo dõi các cập nhật mới nhất của bạn</p>
      </div>

      <nav className="sidebar-nav">
        {tabs.map((tab) => {
          const unread = getUnreadCount(tab.key);
          return (
            <button
              key={tab.key}
              className={`nav-tab-btn ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => onTabChange(tab.key)}
            >
              <div className="btn-left">
                <span className="icon">{tab.icon}</span>
                <div className="tab-info">
                  <span className="tab-label tab-label-long">{tab.label}</span>
                  <span className="tab-label tab-label-short">{tab.shortLabel}</span>
                  <span className="tab-desc">{tab.desc}</span>
                </div>
              </div>
              {unread > 0 && <span className="unread-badge">{unread}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default NotificationSidebar;