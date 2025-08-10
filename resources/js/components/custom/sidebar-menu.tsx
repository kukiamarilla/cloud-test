import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { 
  BarChart3, 
  Wallet, 
  Settings, 
  HelpCircle, 
  Info,
  RefreshCw,
  Tag,
  FolderOpen
} from 'lucide-react';
import { useRefresh } from '../../contexts/refresh-context';
import { AddCategory } from './add-category';
import { AddGrouper } from './add-grouper';

interface SidebarMenuProps {
  onClose: () => void;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({ onClose }) => {
  const { triggerRefresh, setShowGrouperManagement, setShowCategoryManagement } = useRefresh();

  const handleRefresh = () => {
    triggerRefresh();
    onClose();
  };

  const menuItems = [
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: 'Dashboard',
      description: 'Vista general de finanzas',
      onClick: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        onClose();
      }
    },
    {
      icon: <Wallet className="h-5 w-5" />,
      title: 'Movimientos',
      description: 'Gestionar transacciones',
      onClick: () => {
        const movementsElement = document.querySelector('[data-section="movements"]');
        movementsElement?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      icon: <RefreshCw className="h-5 w-5" />,
      title: 'Actualizar',
      description: 'Refrescar datos',
      onClick: handleRefresh
    }
  ];

  const managementItems = [
    {
      icon: <Tag className="h-5 w-5" />,
      title: 'Gestionar Categorías',
      description: 'Crear y editar categorías',
      onClick: () => {
        setShowCategoryManagement(true);
        onClose();
      }
    },
    {
      icon: <FolderOpen className="h-5 w-5" />,
      title: 'Gestionar Agrupadores',
      description: 'Crear y editar agrupadores',
      onClick: () => {
        setShowGrouperManagement(true);
        onClose();
      }
    }
  ];

  const secondaryItems = [
    {
      icon: <Settings className="h-5 w-5" />,
      title: 'Configuración',
      onClick: () => {
        // TODO: Implement settings
        onClose();
      }
    },
    {
      icon: <HelpCircle className="h-5 w-5" />,
      title: 'Ayuda',
      onClick: () => {
        // TODO: Implement help
        onClose();
      }
    },
    {
      icon: <Info className="h-5 w-5" />,
      title: 'Acerca de',
      onClick: () => {
        // TODO: Implement about
        onClose();
      }
    }
  ];

  return (
    <>
      <div className="space-y-6">
        {/* Main Menu */}
        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start h-auto p-4"
              onClick={item.onClick}
            >
                              <div className="flex items-start space-x-3">
                  <div className="text-muted-foreground mt-0.5">
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                  </div>
                </div>
            </Button>
          ))}
        </div>

        {/* Management Section */}
        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-foreground mb-3">Gestión</h3>
          <div className="space-y-3">
            {managementItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start h-auto p-4"
                onClick={item.onClick}
              >
                <div className="flex items-start space-x-3">
                  <div className="text-muted-foreground mt-0.5">
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t pt-4">
          <div className="space-y-2">
            {secondaryItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start"
                onClick={item.onClick}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-muted-foreground">
                    {item.icon}
                  </div>
                  <span>{item.title}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* App Info */}
        <Card className="mt-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Escama</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xs text-muted-foreground space-y-1">
              <div>Gestión de finanzas personales</div>
              <div>Versión 0.1.0</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <div className="hidden">
        <AddCategory />
        <AddGrouper />
      </div>
    </>
  );
}; 