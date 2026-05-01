import { useState, useCallback } from "react";
import { View, RefreshControl, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScrollableProps = {
  children: React.ReactNode;
  padding?: number;
  gap?: number;
  backgroundColor?: string;
  onRefresh?: () => Promise<void>;
};

export default function Scrollable({
  children,
  padding = 20,
  gap = 0,
  backgroundColor = "#ffffff",
  onRefresh,
}: ScrollableProps) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefreshWrapper = useCallback(async () => {
    if (onRefresh) {
      setRefreshing(true);
      await onRefresh();
      setRefreshing(false);
    }
  }, [onRefresh]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefreshWrapper}
            />
          ) : undefined
        }
      >
        <View style={[{ padding: padding, gap: gap, flex: 1 }]}>
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
